
import React, { useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { User, MapPin, Briefcase, Globe, Mail, Save, X, Edit2, Code, Building } from 'lucide-react';
import Button from './ui/Button';

interface ProfilePageProps {
    userProfile: UserProfile | null;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userProfile }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<UserProfile>>({});

    useEffect(() => {
        if (userProfile) {
            setFormData({
                displayName: userProfile.displayName,
                bio: userProfile.bio || '',
                location: userProfile.location || '',
                website: userProfile.website || '',
                companyName: userProfile.companyName || '',
                skills: userProfile.skills || [],
            });
        }
    }, [userProfile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const skills = e.target.value.split(',').map(s => s.trim());
        setFormData(prev => ({ ...prev, skills }));
    };

    const handleSave = async () => {
        if (!userProfile) return;
        setLoading(true);
        try {
            const userRef = doc(db, "hive_profiles", userProfile.uid);
            await updateDoc(userRef, {
                ...formData,
                updatedAt: new Date().toISOString()
            });
            setIsEditing(false);
            // Optional: Show success toast
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!userProfile) return <div className="text-white">Loading profile...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-wider text-white font-display uppercase">My Profile</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage your public presence and account settings.</p>
                </div>
                <Button
                    onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
                    variant={isEditing ? "outline" : "primary"}
                    className="font-display uppercase tracking-widest text-xs"
                >
                    {isEditing ? <><X size={16} className="mr-2" /> Cancel</> : <><Edit2 size={16} className="mr-2" /> Edit Profile</>}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Avatar & Basic Info */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center shadow-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
                        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-800 to-black rounded-full border-2 border-white/20 flex items-center justify-center mb-4 shadow-glow">
                            <span className="text-4xl font-bold text-white font-display">
                                {userProfile.displayName?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <h2 className="text-xl font-bold text-white font-display mb-1">{userProfile.displayName}</h2>
                        <div className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-widest font-bold text-gray-300">
                            {userProfile.role}
                        </div>

                        <div className="mt-6 flex flex-col gap-3 text-sm text-gray-400 text-left">
                            <div className="flex items-center gap-3">
                                <Mail size={16} className="text-gray-500" />
                                <span className="truncate">{userProfile.email}</span>
                            </div>
                            {(formData.location || !isEditing) && (
                                <div className="flex items-center gap-3">
                                    <MapPin size={16} className="text-gray-500" />
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            placeholder="City, Country"
                                            className="bg-black/50 border border-white/10 rounded px-2 py-1 text-white w-full text-xs focus:border-white/40 outline-none"
                                        />
                                    ) : (
                                        <span>{userProfile.location || 'Location not set'}</span>
                                    )}
                                </div>
                            )}
                            {(userProfile.role === 'client' || isEditing) && (
                                <div className="flex items-center gap-3">
                                    <Building size={16} className="text-gray-500" />
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleChange}
                                            placeholder="Company Name"
                                            className="bg-black/50 border border-white/10 rounded px-2 py-1 text-white w-full text-xs focus:border-white/40 outline-none"
                                        />
                                    ) : (
                                        <span>{userProfile.companyName || 'Company not set'}</span>
                                    )}
                                </div>
                            )}
                            {(formData.website || isEditing) && (
                                <div className="flex items-center gap-3">
                                    <Globe size={16} className="text-gray-500" />
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="website"
                                            value={formData.website}
                                            onChange={handleChange}
                                            placeholder="https://example.com"
                                            className="bg-black/50 border border-white/10 rounded px-2 py-1 text-white w-full text-xs focus:border-white/40 outline-none"
                                        />
                                    ) : (
                                        <a href={userProfile.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline truncate">
                                            {userProfile.website || 'Add website'}
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Detailed Info */}
                <div className="md:col-span-2 space-y-6">
                    {/* Bio Section */}
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest font-display mb-4 border-b border-white/5 pb-2">About Me</h3>
                        {isEditing ? (
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows={5}
                                placeholder="Tell us about yourself..."
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm text-gray-300 focus:border-white/40 outline-none resize-none"
                            />
                        ) : (
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {userProfile.bio || "No bio added yet."}
                            </p>
                        )}
                    </div>

                    {/* Skills Section (Freelancer Only) */}
                    {userProfile.role === 'freelancer' && (
                        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                                <h3 className="text-sm font-bold text-white uppercase tracking-widest font-display">Skills</h3>
                                <Code size={16} className="text-gray-500" />
                            </div>

                            {isEditing ? (
                                <div>
                                    <input
                                        type="text"
                                        value={formData.skills?.join(', ')}
                                        onChange={handleSkillsChange}
                                        placeholder="React, TypeScript, Node.js (comma separated)"
                                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm text-gray-300 focus:border-white/40 outline-none"
                                    />
                                    <p className="text-[10px] text-gray-500 mt-2">Separate skills with commas.</p>
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {userProfile.skills && userProfile.skills.length > 0 ? (
                                        userProfile.skills.map((skill, index) => (
                                            <span key={index} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300 font-medium">
                                                {skill}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-sm italic">No skills listed.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Action Buttons */}
                    {isEditing && (
                        <div className="flex justify-end pt-4">
                            <Button onClick={handleSave} disabled={loading} className="font-display uppercase tracking-widest text-xs">
                                {loading ? 'Saving...' : <><Save size={16} className="mr-2" /> Save Changes</>}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
