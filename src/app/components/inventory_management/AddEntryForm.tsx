import { X } from "lucide-react";
import { useState } from "react";

interface AddEntryFormProps {
    onAdd: (item: { 
        id: string; 
        name: string; 
        quantity: number; 
        category: string; 
        timestamp: number; 
        storageType: "fridge" | "freezer" 
    }) => void;
    onDismiss: () => void;
    categories: string[];
}

/**
 * 手動新增食材表單 (AddEntryForm)
 * 當 YOLO AI 無法正確辨識，或使用者想直接把菜市場剛買回來的整包內容輸入時使用。
 * 提供名稱欄位、數量調整器與分類下拉選單，介面採用懸浮卡片 (Card) 的設計，
 * 點擊 Confirm Registry 後會透過 `onAdd` 事件拋回給父層寫入 Context。
 */
export function AddEntryForm({ onAdd, onDismiss, categories }: AddEntryFormProps) {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("蔬菜");
    const [storageType, setStorageType] = useState<"fridge" | "freezer">("fridge");

    const handleSubmit = () => {
        if (name.trim()) {
            const now = Date.now();
            onAdd({ 
                id: `${now}-${Math.random().toString(36).substr(2, 9)}`,
                name: name.trim(), 
                quantity, 
                category,
                timestamp: now,
                storageType
            });
            setName("");
            setQuantity(1);
            onDismiss();
        }
    };

    return (
        <div className="px-6 py-4 animate-in slide-in-from-top-4 duration-300">
            <div className="bg-[#1a4d3d] rounded-[2.5rem] p-8 border-2 border-primary/20 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                    <button onClick={onDismiss} className="text-white/20 hover:text-white/50"><X size={20} /></button>
                </div>
                <div className="flex items-center gap-3 mb-6">
                    <h3 className="font-black text-[0.7rem] tracking-widest uppercase text-white/50">手動新增食材 (New Entry)</h3>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-[0.63rem] font-black text-gray-500 uppercase tracking-widest mb-2 block">食材名稱 (Item Name)</label>
                        <input
                            type="text"
                            placeholder="例如：酪梨"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-5 py-4 bg-background rounded-2xl border border-white/10 focus:outline-none focus:border-primary transition-all text-sm font-bold shadow-inner text-white"
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-[0.63rem] font-black text-gray-500 uppercase tracking-widest mb-2 block">數量</label>
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                className="w-full px-5 py-4 bg-background rounded-2xl border border-white/10 focus:outline-none focus:border-primary transition-all text-sm font-bold shadow-inner text-white"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-[0.63rem] font-black text-gray-500 uppercase tracking-widest mb-2 block">分類</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-5 py-4 bg-background rounded-2xl border border-white/10 focus:outline-none focus:border-primary transition-all text-sm font-bold appearance-none shadow-inner text-white"
                            >
                                {categories.filter(c => c !== "全部").map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-[0.63rem] font-black text-gray-500 uppercase tracking-widest mb-2 block">儲存區域</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button 
                                onClick={() => setStorageType("fridge")}
                                className={`py-3 rounded-xl border text-[0.65rem] font-black transition-all ${storageType === 'fridge' ? 'bg-primary text-black border-primary' : 'bg-white/5 border-white/10 text-gray-400'}`}
                            >
                                冷藏庫
                            </button>
                            <button 
                                onClick={() => setStorageType("freezer")}
                                className={`py-3 rounded-xl border text-[0.65rem] font-black transition-all ${storageType === 'freezer' ? 'bg-blue-400 text-black border-blue-400' : 'bg-white/5 border-white/10 text-gray-400'}`}
                            >
                                冷凍庫
                            </button>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            onClick={handleSubmit}
                            className="w-full py-4 bg-primary text-black rounded-2xl font-black uppercase tracking-widest text-[0.75rem] shadow-[0_10px_20px_var(--primary-glow)] active:scale-95 transition-all"
                        >
                            確認載入
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
