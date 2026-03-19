import { User } from 'lucide-react';

export default function StudentDetails({ student }) {
  if (!student) return null;

  return (
    <div className="mt-6 bg-slate-900 border border-amber-500/30 rounded-xl p-6 shadow-xl animate-[fadeIn_0.3s_ease-out]">
      <h2 className="text-lg font-medium text-amber-500 mb-4 flex items-center gap-2">
        <User size={20} strokeWidth={2} />
        Student Details
      </h2>
      <div className="grid grid-cols-2 gap-y-4 gap-x-6">
        <div>
          <div className="text-[12px] uppercase tracking-wider text-slate-400 font-medium mb-1">
            Full Name
          </div>
          <div className="text-slate-100 text-[15px]">{student.name}</div>
        </div>
        <div>
          <div className="text-[12px] uppercase tracking-wider text-slate-400 font-medium mb-1">
            Roll Number
          </div>
          <div className="text-slate-100 text-[15px] font-mono">
            #{student.rollNumber}
          </div>
        </div>
        <div>
          <div className="text-[12px] uppercase tracking-wider text-slate-400 font-medium mb-1">
            Class
          </div>
          <div className="text-slate-100 text-[15px]">{student.class}</div>
        </div>
      </div>
    </div>
  );
}
