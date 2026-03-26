import React, { useState, useEffect } from 'react';
import { Trash2, UserPlus, Eye, ChevronRight } from 'lucide-react';
import { fetchStudents, bulkDelete } from '../../api/studentApi';
import { Link } from 'react-router-dom';

const Home = () => {
  const [students, setStudents] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const res = await fetchStudents();
    setStudents(res.data.data);
  };

  const handleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (window.confirm(`Delete ${selectedIds.length} students?`)) {
      await bulkDelete(selectedIds);
      setSelectedIds([]);
      loadStudents();
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Student Directory</h1>
        <Link to="/add" className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-sky-600 transition-all shadow-lg shadow-sky-200">
          <UserPlus size={18} /> Add Student
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase text-xs font-semibold">
            <tr>
              <th className="p-4 w-10"></th>
              <th className="p-4">Name</th>
              <th className="p-4">Course</th>
              <th className="p-4">Email</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {students.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="p-4">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.includes(s.id)}
                    onChange={() => handleSelect(s.id)}
                    className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                  />
                </td>
                <td className="p-4 font-medium text-slate-700">{s.name}</td>
                <td className="p-4 text-slate-500">{s.course}</td>
                <td className="p-4 text-slate-500">{s.email}</td>
                <td className="p-4 text-right">
                  <Link to={`/student/${s.id}`} className="text-slate-400 hover:text-primary transition-colors inline-flex items-center">
                    View <ChevronRight size={16} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Floating Bulk Delete Bar */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-6 animate-bounce-in">
          <p className="font-medium">{selectedIds.length} students selected</p>
          <button 
            onClick={handleBulkDelete}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors"
          >
            <Trash2 size={18} /> Delete All
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;