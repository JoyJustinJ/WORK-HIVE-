import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { UserProfile } from '../types';
import {
    Users,
    Briefcase,
    Code,
    Shield,
    Search,
    Filter,
    MoreHorizontal,
    ArrowUpRight,
    Activity,
    LogOut
} from 'lucide-react';
import Card from './ui/Card';

const AdminPage: React.FC = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        clients: 0,
        freelancers: 0,
        newToday: 0
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Fetch all profiles
                const q = query(collection(db, "hive_profiles"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);

                const fetchedUsers: UserProfile[] = [];
                let clients = 0;
                let freelancers = 0;

                querySnapshot.forEach((doc) => {
                    const data = doc.data() as UserProfile;
                    fetchedUsers.push(data);
                    if (data.role === 'client') clients++;
                    if (data.role === 'freelancer') freelancers++;
                });

                setUsers(fetchedUsers);
                setStats({
                    total: fetchedUsers.length,
                    clients,
                    freelancers,
                    newToday: 0 // Placeholder for now
                });
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleLogout = () => {
        navigate('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
            {/* Admin Header */}
            <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                            <Shield className="text-white" size={20} />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold font-display tracking-wider">WORK HIVE <span className="text-red-500">ADMIN</span></h1>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest">System Administration</p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-xs font-bold uppercase tracking-widest"
                    >
                        <LogOut size={16} /> Exit Console
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-10">

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    <Card className="relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-blue-500/20"></div>
                        <div className="relative z-10">
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-2">Total Users</p>
                            <div className="flex items-end gap-2">
                                <h3 className="text-3xl font-bold font-display">{stats.total}</h3>
                                <span className="text-xs text-green-500 flex items-center mb-1">+5% <ArrowUpRight size={12} /></span>
                            </div>
                        </div>
                        <div className="mt-4 p-2 bg-white/5 rounded-lg w-fit">
                            <Users size={20} className="text-blue-400" />
                        </div>
                    </Card>

                    <Card className="relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-purple-500/20"></div>
                        <div className="relative z-10">
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-2">Freelancers</p>
                            <div className="flex items-end gap-2">
                                <h3 className="text-3xl font-bold font-display">{stats.freelancers}</h3>
                                <span className="text-[10px] text-gray-400 mb-1">Talent Pool</span>
                            </div>
                        </div>
                        <div className="mt-4 p-2 bg-white/5 rounded-lg w-fit">
                            <Code size={20} className="text-purple-400" />
                        </div>
                    </Card>

                    <Card className="relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-amber-500/20"></div>
                        <div className="relative z-10">
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-2">Clients</p>
                            <div className="flex items-end gap-2">
                                <h3 className="text-3xl font-bold font-display">{stats.clients}</h3>
                                <span className="text-[10px] text-gray-400 mb-1">Active Buyers</span>
                            </div>
                        </div>
                        <div className="mt-4 p-2 bg-white/5 rounded-lg w-fit">
                            <Briefcase size={20} className="text-amber-400" />
                        </div>
                    </Card>

                    <Card className="relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-green-500/20"></div>
                        <div className="relative z-10">
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-2">System Status</p>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <h3 className="text-xl font-bold font-display text-green-500">OPERATIONAL</h3>
                            </div>
                        </div>
                        <div className="mt-4 p-2 bg-white/5 rounded-lg w-fit">
                            <Activity size={20} className="text-green-400" />
                        </div>
                    </Card>
                </div>

                {/* Users Table */}
                <div className="bg-black/40 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
                    <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold font-display tracking-wide">User Database</h2>
                            <p className="text-xs text-gray-500 mt-1">Manage and view all registered users.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search users..."
                                    className="bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-gray-300 focus:outline-none focus:border-white/30 w-64"
                                />
                            </div>
                            <button className="p-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                                <Filter size={18} className="text-gray-400" />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/5">
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">User</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Role</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Joined</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {users.filter(user =>
                                    user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    user.email.toLowerCase().includes(searchQuery.toLowerCase())
                                ).map((user) => (
                                    <tr key={user.uid} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-xs font-bold border border-white/10">
                                                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : '?'}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-200">{user.displayName || 'Unknown User'}</p>
                                                    <p className="text-xs text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${user.role === 'client'
                                                ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                                : user.role === 'admin'
                                                    ? 'bg-red-500/10 text-red-500 border-red-500/20'
                                                    : 'bg-purple-500/10 text-purple-500 border-purple-500/20'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs text-gray-400 font-mono">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                                <span className="text-xs text-gray-300">Active</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-gray-500 hover:text-white transition-colors">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminPage;
