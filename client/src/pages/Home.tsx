import { useState, useEffect, useRef, ReactNode, RefObject } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ShoppingCart, X, Plus, Minus, Menu, MapPin, Clock, Phone, ArrowRight, ChevronDown } from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────

type ProductCategory = "mooncake" | "htoomount" | "gift";
type FilterCategory = "all" | ProductCategory;

interface Product {
    id: number;
    category: ProductCategory;
    badge: string;
    name: string;
    burmese: string;
    price: number;
    unit: string;
    desc: string;
    flavors: string[];
    img: string;
    color: string;
    bg: string;
}

interface CartItem extends Product {
    qty: number;
}

interface StoreLocation {
    type: string;
    name: string;
    addr: string;
    hours: string;
    phone: string;
    highlight: boolean;
}

interface FooterColumn {
    title: string;
    links: string[];
}

interface AnimSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

interface CartDrawerProps {
    cart: CartItem[];
    open: boolean;
    onClose: () => void;
    onRemove: (id: number) => void;
    onQty: (id: number, delta: number) => void;
}

interface ProductCardProps {
    p: Product;
    onAdd: (p: Product) => void;
    onView: (p: Product) => void;
}

interface ProductModalProps {
    p: Product | null;
    onClose: () => void;
    onAdd: (p: Product) => void;
}

// ─── Data ──────────────────────────────────────────────────────────────────

const PRODUCTSS: Product[] = [
    {
        id: 1, category: "mooncake", badge: "Signature",
        name: "Coffee Mooncake", burmese: "ကော်ဖီလမုန့်",
        price: 4500, unit: "box / 4 pcs",
        desc: "Rich Mandalay coffee blended into silky lotus paste, wrapped in our golden-brown flaky crust. The iconic MMC creation.",
        flavors: ["Espresso", "White Coffee", "Robusta Blend"],
        img: "☕", color: "#6F4E37", bg: "#FFF8F2",
    },
    {
        id: 2, category: "mooncake", badge: "Classic",
        name: "Lotus Seed Mooncake", burmese: "ကြာစေ့လမုန့်",
        price: 3800, unit: "box / 4 pcs",
        desc: "Traditional double-yolk lotus seed paste mooncake. Time-honoured recipe passed through three generations.",
        flavors: ["Single Yolk", "Double Yolk", "No Yolk"],
        img: "🌸", color: "#C9A96E", bg: "#FFFBF2",
    },
    {
        id: 3, category: "mooncake", badge: "New",
        name: "Pandan Coconut Mooncake", burmese: "ပန်းသေနတ်လမုန့်",
        price: 4200, unit: "box / 4 pcs",
        desc: "Fragrant pandan leaf extract meets rich Ayeyarwady coconut cream — a tropical Burmese celebration in every bite.",
        flavors: ["Classic", "Toasted Coconut"],
        img: "🥥", color: "#2D6A4F", bg: "#F0FFF4",
    },
    {
        id: 4, category: "htoomount", badge: "Bestseller",
        name: "Golden Htoomount", burmese: "ရွှေထိုးမုန့်",
        price: 1800, unit: "per 500g",
        desc: "Mandalay's pride — steamed glutinous rice with palm sugar and sesame. Soft, chewy, and deeply aromatic.",
        flavors: ["Original", "Black Sesame", "Coconut"],
        img: "🟡", color: "#D4A017", bg: "#FFFDF0",
    },
    {
        id: 5, category: "htoomount", badge: "Seasonal",
        name: "Jackfruit Htoomount", burmese: "ဖရဲသီးထိုးမုန့်",
        price: 2200, unit: "per 500g",
        desc: "Fresh ripe jackfruit folded into our signature glutinous base. A seasonal delight celebrating Mandalay summers.",
        flavors: ["Sweet", "Extra Sweet"],
        img: "🍈", color: "#E8A000", bg: "#FFFAEB",
    },
    {
        id: 6, category: "gift", badge: "Gift Set",
        name: "Heritage Gift Box", burmese: "မြန်မာ့အမွေအနှစ် လက်ဆောင်ပုံး",
        price: 18500, unit: "set",
        desc: "A curated luxury box featuring 2 mooncakes + 2 htoomount varieties, gift-wrapped with traditional Mandalay fabric ribbon.",
        flavors: ["Assorted"],
        img: "🎁", color: "#8B1A1A", bg: "#FFF5F5",
    },
];

const PRODUCTS: Product[] = [
    {
        id: 1, category: "mooncake", badge: "Signature",
        name: "Coffee Mooncake", burmese: "ကော်ဖီလမုန့်",
        price: 4500, unit: "၁ ဘူး (၄ ခုပါ)",
        desc: "မန္တလေးကော်ဖီစစ်စစ်ရဲ့ ရနံ့သင်းပျံ့မှုကို ကြာစေ့ယိုနဲ့ အချိုးကျစပ်ဟပ်ထားပြီး ရွှေရောင်ဝင်းနေတဲ့ မုန့်သားအလွှာလေးနဲ့ ထုပ်ပိုးထားပါတယ်။ MMC ရဲ့ အနှစ်သက်ဆုံး လက်ရာတစ်ခုပါ။",
        flavors: ["Espresso", "White Coffee", "Robusta Blend"],
        img: "☕", color: "#6F4E37", bg: "#FFF8F2",
    },
    {
        id: 2, category: "mooncake", badge: "Classic",
        name: "Lotus Seed Mooncake", burmese: "ကြာစေ့လမုန့်",
        price: 3800, unit: "၁ ဘူး (၄ ခုပါ)",
        desc: "မိသားစုမျိုးဆက် ၃ ဆက်တိုင် လက်ဆင့်ကမ်းလာတဲ့ ရိုးရာနည်းစနစ်အတိုင်း ကြာစေ့ယိုနဲ့ ဘဲဥငန်နှစ်ကို အချိုးကျထည့်သွင်းဖန်တီးထားတဲ့ ဂန္ထဝင်လမုန့်ပါ။",
        flavors: ["ဘဲဥတစ်လုံး", "ဘဲဥနှစ်လုံး", "ဘဲဥမပါ"],
        img: "🌸", color: "#C9A96E", bg: "#FFFBF2",
    },
    {
        id: 3, category: "mooncake", badge: "New",
        name: "Pandan Coconut Mooncake", burmese: "ဆွမ်းမွှေးအုန်းနို့လမုန့်",
        price: 4200, unit: "၁ ဘူး (၄ ခုပါ)",
        desc: "ဆွမ်းမွှေးရနံ့သင်းသင်းလေးနဲ့ ဧရာဝတီမြစ်ဝှမ်းထွက် အုန်းနို့ဆီရဲ့ ဆိမ့်အိမှုကို ပေါင်းစပ်ပေးထားတဲ့ မြန်မာ့အငွေ့အသက်ပါတဲ့ လမုန့်အသစ်ပါ။",
        flavors: ["Classic", "Toasted Coconut"],
        img: "🥥", color: "#2D6A4F", bg: "#F0FFF4",
    },
    {
        id: 4, category: "htoomount", badge: "Bestseller",
        name: "Golden Htoomount", burmese: "ရွှေထိုးမုန့်",
        price: 1800, unit: "၅၀ သား (တစ်ထုပ်)",
        desc: "မန္တလေးရဲ့ ဂုဏ်ဆောင် - ကောက်ညှင်း၊ ထန်းလျက်နဲ့ နှမ်းတို့ရဲ့ မွှေးရနံ့ကို အပြည့်အဝရရှိစေမှာပါ။ နူးညံ့စေးပိုင်တဲ့ အရသာက စားဖူးသူတိုင်း အကြိုက်တွေ့စေမှာပါ။",
        flavors: ["ရိုးရာအရသာ", "နှမ်းနက်", "အုန်းသီး"],
        img: "🟡", color: "#D4A017", bg: "#FFFDF0",
    },
    {
        id: 5, category: "htoomount", badge: "Seasonal",
        name: "Jackfruit Htoomount", burmese: "ပိန္နဲသီးထိုးမုန့်",
        price: 2200, unit: "၅၀ သား (တစ်ထုပ်)",
        desc: "မန္တလေးနွေရာသီရဲ့ အထိမ်းအမှတ်အဖြစ် မှည့်ဝင်းနေတဲ့ ပိန္နဲသီးအနှစ်တွေကို ရိုးရာထိုးမုန့်သားထဲ ထည့်သွင်းပြုလုပ်ထားတဲ့ ရာသီပေါ် မုန့်ကောင်းလေးပါ။",
        flavors: ["အချို", "အချိုကဲ"],
        img: "🍈", color: "#E8A000", bg: "#FFFAEB",
    },
    {
        id: 6, category: "gift", badge: "Gift Set",
        name: "Heritage Gift Box", burmese: "မြန်မာ့အမွေအနှစ် လက်ဆောင်ပုံး",
        price: 18500, unit: "၁ ပုံး",
        desc: "လမုန့် ၂ ခုနဲ့ ထိုးမုန့် ၂ မျိုးကို မန္တလေးရိုးရာ အထည်အလိပ်လေးတွေနဲ့ လှပစွာ ထုပ်ပိုးပေးထားတဲ့ အဆင့်မြင့် လက်ဆောင်ပုံးလေးပါ။",
        flavors: ["အစုံ"],
        img: "🎁", color: "#8B1A1A", bg: "#FFF5F5",
    },
];

const STORE_LOCATIONS: StoreLocation[] = [
    {
        type: "🏭 ပင်ရင်းစက်ရုံ",
        name: "မြင့်မြင့်ချို (MMC) မုန့်ထုတ်လုပ်ရေးစက်ရုံ",
        addr: "အမှတ် ၄၅, 73 x 74, 120 လမ်း, ပြည်ကြီးတံခွန်မြို့နယ်, မန္တလေးမြို့",
        hours: "တနင်္လာ - စနေ (နံနက် ၇:၀၀ မှ ညနေ ၅:၀၀ ထိ)",
        phone: "+959 4310 3121",
        highlight: true,
    },
    {
        type: "🏪 Showroom",
        name: "မြင့်မြင့်ချို (MMC) မန္တလေး ဆိုင်ခွဲ",
        addr: "အမှတ် ၁၂, 83rd Street, Aung Myay Thar Zan Township, Mandalay",
        hours: "နေ့စဉ် (နံနက် ၈:၀၀ မှ ည ၈:၀၀ ထိ)",
        phone: "+959 257 498 009",
        highlight: false,
    },
    {
        type: "📦 အွန်လိုင်းမှ မှာယူရန်",
        name: "MMC Online Shop",
        addr: "မြန်မာပြည်အနှံ့ ပို့ဆောင်ပေးပါသည်။ မန္တလေးမြို့တွင်း မှာယူမှု ၃၀,၀၀၀ ကျပ်နှင့်အထက်ကို ပို့ခအခမဲ့ (Free Delivery) ဖြင့် ဝန်ဆောင်မှုပေးနေပါသည်။",
        hours: "ပို့ဆောင်ချိန် – တနင်္လာ မှ စနေနေ့",
        phone: "+959 4310 3121, +959 257 498 009",
        highlight: false,
    },
];

const FOOTER_COLUMNS = [
    {
        title: "Shop",
        links: [
            { name: "Mooncakes", id: "products" },
            { name: "Htoomount", id: "products" },
            { name: "Gift Sets", id: "products" }
        ]
    },
    {
        title: "Company",
        links: [
            { name: "About MMC", id: "about" },
            { name: "Our Heritage", id: "heritage" },
            { name: "Store Locations", id: "store" }
        ]
    },
    {
        title: "Support",
        links: [
            { name: "Contact Us", id: "footer" },
            { name: "Delivery Info", id: "store" }
        ]
    },
];

const SOCIAL_LINKS = {
    facebook: "https://www.facebook.com/mmcfood", // Replace with your actual FB page slug
    messenger: "https://www.facebook.com/mmcfood",             // Replace with your actual FB page slug
    viber: "viber://chat?number=%2B95943103121",   // International format: +959...
};

const BADGE_COLORS: Record<string, string> = {
    New: "#2D6A4F",
    Bestseller: "#C4501A",
    Seasonal: "#D4A017",
    default: "#8B1A1A",
};

// ─── Framer Motion Variants ─────────────────────────────────────────────────

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

// ─── Hooks ─────────────────────────────────────────────────────────────────

function useScrollY(): number {
    const [y, setY] = useState<number>(0);
    useEffect(() => {
        const fn = () => setY(window.scrollY);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);
    return y;
}

function useInView(ref: RefObject<HTMLDivElement | null>, threshold = 0.15): boolean {
    const [visible, setVisible] = useState<boolean>(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [ref, threshold]);
    return visible;
}

// ─── Utility Components ────────────────────────────────────────────────────

function AnimSection({ children, className = "", delay = 0 }: AnimSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const visible = useInView(ref);
    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
            }}
        >
            {children}
        </div>
    );
}

function BadgeLabel({ badge }: { badge: string }) {
    const bg = BADGE_COLORS[badge] ?? BADGE_COLORS.default;
    return (
        <div style={{
            position: "absolute", top: 14, left: 14, zIndex: 2,
            background: bg, color: "#fff", fontSize: 11, fontWeight: 700,
            padding: "4px 10px", borderRadius: 20, letterSpacing: "0.5px",
        }}>
            {badge}
        </div>
    );
}

// ─── Cart Drawer ───────────────────────────────────────────────────────────

function CartDrawer({ cart, open, onClose, onRemove, onQty }: CartDrawerProps) {
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

    return (
        <>
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={onClose}
                        style={{
                            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
                            zIndex: 200,
                        }}
                    />
                )}
            </AnimatePresence>

            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: open ? "0%" : "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 35 }}
                style={{
                    position: "fixed", top: 0, right: 0, bottom: 0,
                    width: "min(420px, 100vw)", background: "#fff", zIndex: 201,
                    boxShadow: "-4px 0 40px rgba(0,0,0,0.15)",
                    display: "flex", flexDirection: "column",
                }}
            >
                {/* Header */}
                <div style={{ padding: "24px", borderBottom: "1px solid #f0e6d3", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#3D1C02" }}>Your Cart 🛒</div>
                        <div style={{ fontSize: 13, color: "#a08060" }}>{cart.length} item{cart.length !== 1 ? "s" : ""}</div>
                    </div>
                    <button onClick={onClose} style={{ border: "none", background: "none", fontSize: 24, cursor: "pointer", color: "#888", display: "flex", alignItems: "center" }}>
                        <X size={22} />
                    </button>
                </div>

                {/* Items */}
                <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
                    {cart.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "60px 0", color: "#c0a080" }}>
                            <div style={{ fontSize: 48 }}>🎑</div>
                            <div style={{ marginTop: 12, fontSize: 15 }}>Your cart is empty</div>
                        </div>
                    ) : (
                        <AnimatePresence>
                            {cart.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    style={{ display: "flex", gap: 14, padding: "16px 0", borderBottom: "1px solid #f5ede0", alignItems: "center" }}
                                >
                                    <div style={{ fontSize: 36, width: 56, height: 56, borderRadius: 12, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        {item.img}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontWeight: 600, fontSize: 14, color: "#3D1C02" }}>{item.name}</div>
                                        <div style={{ fontSize: 12, color: "#a08060" }}>{item.unit}</div>
                                        <div style={{ fontWeight: 700, color: "#C4501A", fontSize: 15, marginTop: 4 }}>
                                            {item.price.toLocaleString()} Ks
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flexShrink: 0 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fdf5ea", borderRadius: 20, padding: "4px 8px" }}>
                                            <button onClick={() => onQty(item.id, -1)} style={{ border: "none", background: "none", cursor: "pointer", fontWeight: 700, fontSize: 16, color: "#C4501A", display: "flex", alignItems: "center" }}>
                                                <Minus size={14} />
                                            </button>
                                            <span style={{ fontWeight: 700, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                                            <button onClick={() => onQty(item.id, 1)} style={{ border: "none", background: "none", cursor: "pointer", fontWeight: 700, fontSize: 16, color: "#C4501A", display: "flex", alignItems: "center" }}>
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <button onClick={() => onRemove(item.id)} style={{ fontSize: 11, color: "#ccc", border: "none", background: "none", cursor: "pointer" }}>
                                            Remove
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                </div>

                {/* Checkout */}
                {cart.length > 0 && (
                    <div style={{ padding: "20px 24px", borderTop: "1px solid #f0e6d3" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                            <span style={{ color: "#888", fontSize: 15 }}>Total</span>
                            <span style={{ fontWeight: 800, fontSize: 20, color: "#3D1C02" }}>{total.toLocaleString()} Ks</span>
                        </div>
                        <button style={{
                            width: "100%", padding: "16px", borderRadius: 14, border: "none",
                            background: "linear-gradient(135deg, #C4501A, #8B1A1A)", color: "#fff",
                            fontWeight: 700, fontSize: 16, cursor: "pointer", letterSpacing: "0.5px", fontFamily: "inherit",
                        }}>
                            📞  → 959 4310 3121
                        </button>
                        <div style={{ textAlign: "center", marginTop: 10, fontSize: 12, color: "#c0a080" }}>
                            မန္တလေးမြို့တွင်း မှာယူမှု ၃၀,၀၀၀ ကျပ်နှင့်အထက်ကို ပို့ခအခမဲ့ (Free Delivery) ဖြင့် ဝန်ဆောင်မှုပေးနေပါသည်။
                        </div>
                    </div>
                )}
            </motion.div>
        </>
    );
}

// ─── Product Card ──────────────────────────────────────────────────────────

function ProductCard({ p, onAdd, onView }: ProductCardProps) {
    return (
        <motion.div
            whileHover={{ y: -8, boxShadow: "0 20px 60px rgba(196,80,26,0.18)" }}
            transition={{ duration: 0.3 }}
            style={{
                borderRadius: 20, overflow: "hidden", background: "#fff",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                border: "1px solid #f5ede0", position: "relative",
            }}
        >
            <BadgeLabel badge={p.badge} />

            {/* Image area */}
            <motion.div
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.3 }}
                style={{
                    height: 180, background: `linear-gradient(135deg, ${p.bg}, #fff)`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72,
                }}
            >
                {p.img}
            </motion.div>

            <div style={{ padding: "20px 22px 22px" }}>
                <div style={{ fontSize: 11, color: "#a08060", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>
                    {p.category === "mooncake" ? "Mooncake" : p.category === "htoomount" ? "Htoomount" : "Gift Set"}
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 700, color: "#3D1C02", lineHeight: 1.3 }}>
                    {p.name}
                </div>
                <div style={{ fontSize: 12, color: "#b09070", marginBottom: 10 }}>{p.burmese}</div>
                <p style={{ fontSize: 13, color: "#6b5040", lineHeight: 1.6, marginBottom: 14 }}>{p.desc}</p>

                {/* Flavors */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                    {p.flavors.map((f) => (
                        <span key={f} style={{
                            fontSize: 11, padding: "3px 10px", borderRadius: 20,
                            background: p.bg, color: p.color, border: `1px solid ${p.color}30`, fontWeight: 500,
                        }}>
                            {f}
                        </span>
                    ))}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                        <div style={{ fontWeight: 800, fontSize: 20, color: "#C4501A" }}>
                            {p.price.toLocaleString()} <span style={{ fontSize: 12, fontWeight: 500, color: "#a08060" }}>Ks</span>
                        </div>
                        <div style={{ fontSize: 11, color: "#c0a080" }}>{p.unit}</div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                        <button
                            onClick={() => onView(p)}
                            style={{
                                padding: "9px 14px", borderRadius: 10, border: `1.5px solid ${p.color}40`,
                                background: "transparent", color: p.color, fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
                            }}
                        >
                            Details
                        </button>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onAdd(p)}
                            style={{
                                padding: "9px 16px", borderRadius: 10, border: "none",
                                background: `linear-gradient(135deg, ${p.color}, ${p.color}cc)`,
                                color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
                            }}
                        >
                            + Add
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ─── Product Modal ─────────────────────────────────────────────────────────

function ProductModal({ p, onClose, onAdd }: ProductModalProps) {
    return (
        <AnimatePresence>
            {p && (
                <>
                    <motion.div
                        key="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 300, backdropFilter: "blur(4px)" }}
                    />
                    <motion.div
                        key="modal-content"
                        initial={{ opacity: 0, scale: 0.92, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 20 }}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        style={{
                            position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
                            width: "min(600px, 95vw)", background: "#fff", borderRadius: 24, zIndex: 301,
                            overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.3)",
                        }}
                    >
                        <div style={{ height: 200, background: `linear-gradient(135deg, ${p.bg}, #fff9f0)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 90, position: "relative" }}>
                            {p.img}
                            <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, border: "none", background: "rgba(255,255,255,0.8)", borderRadius: 50, width: 36, height: 36, cursor: "pointer", fontSize: 18, color: "#666", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <X size={18} />
                            </button>
                            <BadgeLabel badge={p.badge} />
                        </div>
                        <div style={{ padding: "28px 32px 32px" }}>
                            <div style={{ fontSize: 11, color: "#a08060", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>{p.category}</div>
                            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: "#3D1C02", marginTop: 4 }}>{p.name}</div>
                            <div style={{ fontSize: 14, color: "#b09070", marginBottom: 16 }}>{p.burmese}</div>
                            <p style={{ fontSize: 14, color: "#5a3d28", lineHeight: 1.7, marginBottom: 20 }}>{p.desc}</p>
                            <div style={{ marginBottom: 20 }}>
                                <div style={{ fontSize: 12, fontWeight: 600, color: "#a08060", marginBottom: 8 }}>Available Variants</div>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                    {p.flavors.map((f) => (
                                        <span key={f} style={{ padding: "6px 14px", borderRadius: 20, background: p.bg, color: p.color, border: `1px solid ${p.color}40`, fontSize: 13, fontWeight: 500 }}>
                                            {f}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f5ede0", paddingTop: 20 }}>
                                <div>
                                    <div style={{ fontWeight: 800, fontSize: 26, color: "#C4501A" }}>{p.price.toLocaleString()} Ks</div>
                                    <div style={{ fontSize: 13, color: "#c0a080" }}>{p.unit}</div>
                                </div>
                                <motion.button
                                    whileTap={{ scale: 0.96 }}
                                    onClick={() => { onAdd(p); onClose(); }}
                                    style={{
                                        padding: "14px 28px", borderRadius: 14, border: "none",
                                        background: "linear-gradient(135deg, #C4501A, #8B1A1A)", color: "#fff",
                                        fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "inherit",
                                    }}
                                >
                                    Add to Cart 🛒
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// ─── Main App ──────────────────────────────────────────────────────────────

export default function MMCShopProfile() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [cartOpen, setCartOpen] = useState<boolean>(false);
    const [modalProduct, setModalProduct] = useState<Product | null>(null);
    const [activeNav, setActiveNav] = useState<string>("Home");
    const [filterCat, setFilterCat] = useState<FilterCategory>("all");
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const scrollY = useScrollY();
    const scrolled = scrollY > 60;

    const addToCart = (p: Product): void => {
        setCart((c) => {
            const existing = c.find((i) => i.id === p.id);
            if (existing) return c.map((i) => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
            return [...c, { ...p, qty: 1 }];
        });
    };

    const removeFromCart = (id: number): void => setCart((c) => c.filter((i) => i.id !== id));

    const adjustQty = (id: number, delta: number): void =>
        setCart((c) => c.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));

    const cartCount = cart.reduce((s, i) => s + i.qty, 0);

    const filtered: Product[] = filterCat === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filterCat);

    const scrollTo = (id: string): void => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setMenuOpen(false);
    };

    const navItems: [string, string][] = [
        ["Home", "home"], ["About", "about"], ["Products", "products"],
        ["Heritage", "heritage"], ["Store", "store"], ["Contact", "footer"],
    ];

    const filterTabs: [FilterCategory, string][] = [
        ["all", "လက်ရာမွန်များ"],
        ["mooncake", "လမုန့် 🥮"],
        ["htoomount", "ထိုးမုန့် 🍡"],
        ["gift", "Gift Sets 🎁"],
    ];

    return (
        <div style={{ fontFamily: "'Lora', Georgia, serif", background: "#FDFAF6", color: "#3D1C02", overflowX: "hidden" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,800;1,400&family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Noto+Serif+Myanmar:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #fdf5ea; }
        ::-webkit-scrollbar-thumb { background: #C4501A; border-radius: 3px; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .desktop-nav { display: flex; }
        .hamburger { display: none; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>

            {/* ── Header ── */}
            <motion.header
                style={{
                    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
                    background: scrolled ? "rgba(253,250,246,0.96)" : "transparent",
                    backdropFilter: scrolled ? "blur(20px)" : "none",
                    boxShadow: scrolled ? "0 2px 30px rgba(196,80,26,0.1)" : "none",
                    borderBottom: scrolled ? "1px solid rgba(196,80,26,0.1)" : "none",
                    transition: "background 0.4s, box-shadow 0.4s, border-color 0.4s",
                }}
            >
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
                    {/* Logo */}
                    <button
                        onClick={() => scrollTo("home")}
                        style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", background: "none", border: "none", fontFamily: "inherit" }}
                    >
                        <div style={{ width: 44, height: 44, borderRadius: 14, background: "linear-gradient(135deg, #C4501A, #8B1A1A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, boxShadow: "0 4px 14px rgba(196,80,26,0.4)" }}>
                            🎑
                        </div>
                        <div style={{ textAlign: "left" }}>
                            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 18, color: "#3D1C02", lineHeight: 1 }}>MMC</div>
                            <div style={{ fontSize: 10, color: "#a08060", letterSpacing: "1.5px", textTransform: "uppercase" }}>မြင့်မြင့်ချို</div>
                        </div>
                    </button>

                    {/* Desktop Nav */}
                    <nav className="desktop-nav" style={{ gap: 4, alignItems: "center" }}>
                        {navItems.map(([label, id]) => (
                            <button
                                key={label}
                                onClick={() => { scrollTo(id); setActiveNav(label); }}
                                style={{
                                    padding: "8px 16px", borderRadius: 20, border: "none",
                                    background: activeNav === label ? "rgba(196,80,26,0.1)" : "transparent",
                                    color: activeNav === label ? "#C4501A" : "#5a3d28",
                                    fontWeight: activeNav === label ? 600 : 400, fontSize: 14,
                                    cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit",
                                }}
                            >
                                {label}
                            </button>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

                        <motion.button
                            whileTap={{ scale: 0.93 }}
                            onClick={() => setCartOpen(true)}
                            style={{
                                position: "relative", width: 42, height: 42, borderRadius: 12,
                                background: "linear-gradient(135deg, #C4501A, #8B1A1A)", border: "none",
                                color: "#fff", fontSize: 18, cursor: "pointer",
                                boxShadow: "0 4px 14px rgba(196,80,26,0.35)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}
                        >
                            <ShoppingCart size={20} />
                            <AnimatePresence>
                                {cartCount > 0 && (
                                    <motion.span
                                        key="badge"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        style={{
                                            position: "absolute", top: -6, right: -6, background: "#D4A017",
                                            color: "#fff", borderRadius: 50, width: 20, height: 20,
                                            fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center",
                                            border: "2px solid #FDFAF6",
                                        }}
                                    >
                                        {cartCount}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        {/* Hamburger */}
                        <button
                            className="hamburger"
                            onClick={() => setMenuOpen((m) => !m)}
                            style={{ border: "none", background: "none", fontSize: 22, cursor: "pointer", alignItems: "center", justifyContent: "center", color: "#3D1C02" }}
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{ background: "rgba(253,250,246,0.98)", overflow: "hidden" }}
                        >
                            <div style={{ padding: "12px 24px 20px" }}>
                                {navItems.map(([label, id]) => (
                                    <button
                                        key={label}
                                        onClick={() => scrollTo(id)}
                                        style={{
                                            display: "block", width: "100%", textAlign: "left",
                                            padding: "10px 0", border: "none", background: "none",
                                            color: "#3D1C02", fontSize: 16, cursor: "pointer",
                                            fontFamily: "inherit", borderBottom: "1px solid #f5ede0",
                                        }}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>

            <CartDrawer cart={cart} open={cartOpen} onClose={() => setCartOpen(false)} onRemove={removeFromCart} onQty={adjustQty} />
            <ProductModal p={modalProduct} onClose={() => setModalProduct(null)} onAdd={addToCart} />

            {/* ── Hero ── */}
            <section id="home" style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden", background: "linear-gradient(160deg, #3D1C02 0%, #6F3010 45%, #C4501A 100%)" }}>
                {/* Decorative rings */}
                {([400, 280, 180, 120, 60] as number[]).map((size, i) => (
                    <div key={i} style={{
                        position: "absolute", borderRadius: "50%",
                        width: size, height: size,
                        border: "1px solid rgba(255,255,255,0.08)",
                        top: `${[10, 30, 60, 20, 70][i]}%`,
                        left: `${[60, 70, 80, 55, 75][i]}%`,
                        animation: `spin-slow ${[40, 30, 20, 15, 10][i]}s linear infinite`,
                        animationDirection: i % 2 === 0 ? "normal" : "reverse",
                    }} />
                ))}

                <div style={{ position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)", fontSize: 220, opacity: 0.06, lineHeight: 1, userSelect: "none", animation: "float 6s ease-in-out infinite" }}>🎑</div>

                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px 60px", position: "relative", zIndex: 2 }}>
                    <motion.div variants={stagger} initial="hidden" animate="visible">
                        <motion.div variants={fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
                            <span style={{ display: "inline-block", padding: "6px 18px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.8)", fontSize: 12, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 28, backdropFilter: "blur(10px)", background: "rgba(255,255,255,0.05)" }}>
                                🏮 Since 2005 · Mandalay, Myanmar
                            </span>
                        </motion.div>

                        <motion.h1 variants={fadeUp} transition={{ duration: 0.7, delay: 0.25 }} style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(42px, 7vw, 88px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: 12 }}>
                            Myint Myint<br />Cho <em style={{ color: "#D4A017" }}>Mandalay</em>
                        </motion.h1>

                        <motion.div variants={fadeUp} transition={{ duration: 0.7, delay: 0.3 }} style={{ fontFamily: "'Noto Serif Myanmar', serif", fontSize: "clamp(18px, 3vw, 28px)", color: "rgba(255,255,255,0.6)", marginBottom: 32 }}>
                            မြင့်မြင့်ချို ထိုးမုန့်၊ လမုန့်စက်ရုံ
                        </motion.div>

                        <motion.p variants={fadeUp} transition={{ duration: 0.7, delay: 0.4 }} style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(255,255,255,0.75)", maxWidth: 520, lineHeight: 1.8, marginBottom: 44 }}>
                            မန္တလေးသားတို့ အစဉ်တစိုက် အားပေးလာကြတဲ့ - မြင့်မြင့်ချို (MMC) ရိုးရာမုန့်လုပ်ငန်း။ အဆင့်မြင့် ပြည်တွင်းဖြစ် ပါဝင်ပစ္စည်းများနဲ့ မိသားစုမျိုးဆက်သစ် လက်ရာစစ်စစ် ထိုးမုန့်နဲ့ လမုန့်များကို စနစ်တကျ ဖန်တီးထုတ်လုပ်ပေးနေပါသည်။
                        </motion.p>

                        <motion.div variants={fadeUp} transition={{ duration: 0.7, delay: 0.5 }} style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => scrollTo("products")} style={{ padding: "16px 32px", borderRadius: 14, border: "none", background: "#D4A017", color: "#3D1C02", fontWeight: 700, fontSize: 16, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 8px 30px rgba(212,160,23,0.4)", display: "flex", alignItems: "center", gap: 8 }}>
                                အခုပဲ ဝယ်ယူမယ် 🛍️
                            </motion.button>
                            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => scrollTo("about")} style={{ padding: "16px 32px", borderRadius: 14, border: "1.5px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.08)", color: "#fff", fontWeight: 600, fontSize: 16, cursor: "pointer", fontFamily: "inherit", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", gap: 8 }}>
                                ကျွန်ုပ်တို့အကြောင်း <ArrowRight size={18} />
                            </motion.button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div variants={fadeUp} transition={{ duration: 0.7, delay: 0.65 }} style={{ display: "flex", gap: 40, marginTop: 64, flexWrap: "wrap" }}>
                            {([["25+", "မြန်​မာ့လက်​မှုပညာနှစ်​"], ["50K+", "Happy Customers"], ["30+", "ထူးမုန့်နှင့် လမုန့် အမျိုးအစား ၃၀ ကျော်"]] as [string, string][]).map(([n, l]) => (
                                <div key={l}>
                                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 800, color: "#D4A017" }}>{n}</div>
                                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{l}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                {/* Wave divider */}
                <svg style={{ position: "absolute", bottom: -1, left: 0, right: 0, width: "100%" }} viewBox="0 0 1440 80" preserveAspectRatio="none">
                    <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#FDFAF6" />
                </svg>
            </section>

            {/* ── About ── */}
            <section id="about" style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 64, alignItems: "center" }}>
                    <AnimSection>
                        <div style={{ position: "relative" }}>
                            <div style={{ width: "100%", aspectRatio: "4/3", borderRadius: 24, background: "linear-gradient(135deg, #8B1A1A, #C4501A, #D4A017)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 120, boxShadow: "0 30px 80px rgba(196,80,26,0.3)" }}>
                                🏭
                            </div>
                            <div style={{ position: "absolute", bottom: -20, right: -20, background: "#fff", borderRadius: 20, padding: "16px 20px", boxShadow: "0 10px 40px rgba(0,0,0,0.12)", border: "1px solid #f0e6d3" }}>
                                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 800, color: "#C4501A" }}>2005</div>
                                <div style={{ fontSize: 12, color: "#a08060" }}>Founded in Mandalay</div>
                            </div>
                        </div>
                    </AnimSection>
                    <AnimSection delay={0.2}>
                        <span style={{ display: "inline-block", padding: "5px 16px", borderRadius: 20, background: "rgba(196,80,26,0.08)", color: "#C4501A", fontSize: 12, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 20 }}>About Us</span>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 800, color: "#3D1C02", lineHeight: 1.2, marginBottom: 20 }}>
                            မိသားစုအစဉ်အလာ<br /><em style={{ color: "#C4501A" }}>မန္တလေးမှာ မွေးဖွားခဲ့သော အရသာ</em>
                        </h2>
                        <p style={{ fontSize: 16, color: "#5a3d28", lineHeight: 1.8, marginBottom: 16 }}>
                            {/* Myint Myint Cho — locally known as <strong>MMC</strong> — began as a small family kitchen in Mandalay in 1998. Founded by Daw Myint Myint Cho with a single <em>Htoomount</em> recipe inherited from her grandmother, the factory has grown into one of Mandalay's most celebrated confectionery brands. */}
                            ၂၀၀၅ ခုနှစ်က မန္တလေးမြို့ရဲ့ အိမ်တွင်းမီးဖိုချောင်လေးတစ်ခုကနေ စတင်ခဲ့တဲ့ <strong>"မြင့်မြင့်ချို (MMC)</strong>" ဟာ အခုဆိုရင် မန္တလေးရဲ့ နာမည်အကြီးဆုံး မုန့်လုပ်ငန်းတစ်ခု ဖြစ်နေပါပြီ။
                        </p>
                        <p style={{ fontSize: 16, color: "#5a3d28", lineHeight: 1.8, marginBottom: 28 }}>
                            ယနေ့မှာတော့ မြန်မာရိုးရာမုန့်များ၊ လမုန့်များနှင့် ရာသီအလိုက် မုန့်မျိုးစုံ အမျိုးအစား ၃၀ ကျော် ကို ထုတ်လုပ်လျက်ရှိပြီး
                            ဒေသထွက် ထန်းညှစ်၊ ကောက်ညှင်းနှင့် မန္တလေးထွက် သံပရာဆီစေ့များ ကို စနစ်တကျ လက်မှုပညာနဲ့ ထုတ်လုပ်ပေးနေပါတယ်။
                            {/* Today, we produce over 30 varieties of traditional Burmese sweets, mooncakes, and seasonal treats — all crafted by hand using locally sourced palm sugar, glutinous rice, and Mandalay's finest sesame. */}
                        </p>
                        {([["🌾", "ပြည်တွင်းဖြစ် ၁၀၀% စစ်စစ်"], ["👐", "နေ့စဉ် လတ်လတ်ဆတ်ဆတ် လက်မှုနည်းဖြင့် ထုတ်လုပ်သည်"], ["📦", "မြန်မာပြည်အနှံ့ ပို့ဆောင်ပေးသည်"], ["🏆", "ဆုရ ရိုးရာလက်ရာမွန်များ"]] as [string, string][]).map(([icon, text]) => (
                            <div key={text} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                                <span style={{ fontSize: 20 }}>{icon}</span>
                                <span style={{ fontSize: 15, fontWeight: 500, color: "#4a2c12" }}>{text}</span>
                            </div>
                        ))}
                    </AnimSection>
                </div>
            </section>

            {/* ── Products ── */}
            <section id="products" style={{ padding: "80px 24px 100px", background: "linear-gradient(180deg, #fdf5ea 0%, #FDFAF6 100%)" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <AnimSection>
                        <div style={{ textAlign: "center", marginBottom: 48 }}>
                            <span style={{ display: "inline-block", padding: "5px 16px", borderRadius: 20, background: "rgba(196,80,26,0.08)", color: "#C4501A", fontSize: 12, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 16 }}>Our Products</span>
                            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 800, color: "#3D1C02", marginBottom: 14 }}>မေတ္တာနှင့် ရိုးရာကို အရင်းတည်ကာ ဖန်တီးသည်</h2>
                            <p style={{ fontSize: 16, color: "#7a5a3a", maxWidth: 560, margin: "0 auto" }}>မုန့်တိုင်းကို နေ့စဉ် လတ်ဆတ်စွာ ပြုလုပ်ထားပြီး
                                မန္တလေးမြို့ရဲ့ နှလုံးသားထဲမှာ ၂၅ နှစ်ကျော် အတွေ့အကြုံနဲ့ ပြုပြင်မွမ်းမံထားတဲ့ နည်းစနစ်ကောင်းများကို အသုံးပြုထားပါသည်။</p>
                        </div>
                    </AnimSection>

                    {/* Filter tabs */}
                    <AnimSection delay={0.1}>
                        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 40, flexWrap: "wrap" }}>
                            {filterTabs.map(([val, label]) => (
                                <motion.button
                                    key={val}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={() => setFilterCat(val)}
                                    style={{
                                        padding: "10px 22px", borderRadius: 24, border: "1.5px solid",
                                        borderColor: filterCat === val ? "#C4501A" : "#e8d5bb",
                                        background: filterCat === val ? "#C4501A" : "#fff",
                                        color: filterCat === val ? "#fff" : "#7a5a3a",
                                        fontWeight: filterCat === val ? 700 : 400,
                                        fontSize: 14, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
                                    }}
                                >
                                    {label}
                                </motion.button>
                            ))}
                        </div>
                    </AnimSection>

                    <motion.div
                        layout
                        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 28 }}
                    >
                        <AnimatePresence mode="popLayout">
                            {filtered.map((p, i) => (
                                <motion.div
                                    key={p.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: i * 0.06 }}
                                >
                                    <ProductCard p={p} onAdd={addToCart} onView={setModalProduct} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* ── Heritage ── */}
            <section id="heritage" style={{ padding: "100px 24px", background: "linear-gradient(160deg, #3D1C02 0%, #5a2d10 100%)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none" }}>
                    {Array.from({ length: 20 }).map((_, i) => (
                        <span key={i} style={{ position: "absolute", fontSize: 40, top: `${(i * 23) % 100}%`, left: `${(i * 17) % 100}%` }}>🎑</span>
                    ))}
                </div>
                <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
                    <AnimSection>
                        <div style={{ textAlign: "center", marginBottom: 64 }}>
                            <span style={{ display: "inline-block", padding: "5px 16px", borderRadius: 20, background: "rgba(212,160,23,0.2)", color: "#D4A017", fontSize: 12, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 16 }}>Heritage</span>
                            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 800, color: "#fff", marginBottom: 14 }}>
                                <em style={{ color: "#D4A017" }}>မန္တလေး</em>၏ အရသာနှင့် ဝိညာဉ်
                            </h2>
                            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", maxWidth: 600, margin: "0 auto" }}>
                                ကျွန်ုပ်တို့၏ မုန့်များသည် မန္တလေးမြို့ရဲ့ ယဉ်ကျေးမှု၊ လက်မှုပညာနှင့် လူမှုအသိုင်းအဝိုင်း တို့နဲ့ နက်ရှိုင်းစွာ ဆက်နွယ်နေထားပါတယ်။
                            </p>
                        </div>
                    </AnimSection>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
                        {([
                            { icon: "🏯", title: "ရတနာပုံရဲ့ အမွေအနှစ်", desc: "မြန်မာ့နောက်ဆုံး မင်းနေပြည်တော်ဖြစ်တဲ့ မန္တလေးမြို့ဟာ လက်မှုမုန့်လုပ်ငန်း အစဉ်အလာ ကြီးမားပါတယ်။ MMC ဟာ ဒီလို မြင့်မြတ်တဲ့ မုန့်လုပ်ငန်း အစဉ်အလာကို ဆက်လက် ထိန်းသိမ်းသွားမှာပါ။" },
                            { icon: "🌾", title: "ဧရာဝတီမြစ်ကမ်းမှ ပါဝင်ပစ္စည်းများ", desc: "ကျွန်ုပ်တို့အသုံးပြုတဲ့ ထန်းလျက်တွေက ဧရာဝတီမြစ်ကမ်းဘေးက ထွက်ရှိပြီး၊ ကောက်ညှင်းကိုတော့ စစ်ကိုင်းတိုင်းဘက်ကနေ မှာယူပါတယ်။ ပါဝင်ပစ္စည်းတိုင်းက မိခင်မြေရဲ့ အကြောင်းအရာတွေကို ဖော်ပြနေပါတယ်။" },
                            { icon: "🎋", title: "ပွဲတော်ယဉ်ကျေးမှု", desc: "သင်္ကြန်၊ သီတင်းကျွတ်နဲ့ တခြားသော မြန်မာ့ပွဲတော်တိုင်းမှာ ထိုးမုန့်နဲ့ လမုန့်တွေက မရှိမဖြစ်ပါ။ ပွဲလမ်းသဘင်တိုင်းအတွက် MMC ကို ယုံကြည်စွာ ရွေးချယ်လေ့ရှိကြပါတယ်။" },
                            // { icon: "👨‍👩‍👧", title: "Three Generations", desc: "The original recipes were passed from grandmother to mother to daughter. Today, Daw Myint Myint Cho's children continue the family craft." },
                        ] as { icon: string; title: string; desc: string }[]).map((item, i) => (
                            <AnimSection key={item.title} delay={i * 0.1}>
                                <motion.div
                                    whileHover={{ borderColor: "rgba(212,160,23,0.4)", background: "rgba(255,255,255,0.07)" }}
                                    style={{ padding: "32px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", backdropFilter: "blur(10px)", height: "100%", transition: "all 0.3s" }}
                                >
                                    <div style={{ fontSize: 40, marginBottom: 16 }}>{item.icon}</div>
                                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{item.title}</h3>
                                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{item.desc}</p>
                                </motion.div>
                            </AnimSection>
                        ))}
                    </div>

                    {/* Popular products spotlight */}
                    <AnimSection delay={0.2}>
                        <div style={{ marginTop: 64, padding: "40px", borderRadius: 24, background: "rgba(212,160,23,0.1)", border: "1px solid rgba(212,160,23,0.2)" }}>
                            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: "#D4A017", marginBottom: 8 }}>⭐ လူကြိုက်အများဆုံး လက်ရာမွန်များ</h3>
                            <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 28, fontSize: 14 }}>မန္တလေးတစ်ခွင်မှာ MMC လို့ နာမည်ကျော်စေတဲ့ ထုတ်ကုန်များ</p>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                                {([
                                    { emoji: "☕", name: "Coffee Mooncake", reason: "A daring fusion of Burmese tradition and modern coffee culture" },
                                    { emoji: "🟡", name: "Golden Htoomount", reason: "The original MMC recipe — unchanged since 1998" },
                                    { emoji: "🎁", name: "Heritage Gift Box", reason: "Mandalay's most gifted set for festivals and celebrations" },
                                ] as { emoji: string; name: string; reason: string }[]).map((item) => (
                                    <div key={item.name} style={{ padding: 20, borderRadius: 16, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                                        <div style={{ fontSize: 40, marginBottom: 10 }}>{item.emoji}</div>
                                        <div style={{ fontWeight: 700, color: "#fff", fontSize: 16, marginBottom: 6 }}>{item.name}</div>
                                        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{item.reason}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </AnimSection>
                </div>
            </section>

            {/* ── Store / Location ── */}
            <section id="store" style={{ padding: "100px 24px" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <AnimSection>
                        <div style={{ textAlign: "center", marginBottom: 60 }}>
                            <span style={{ display: "inline-block", padding: "5px 16px", borderRadius: 20, background: "rgba(196,80,26,0.08)", color: "#C4501A", fontSize: 12, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 16 }}>Find Us</span>
                            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 800, color: "#3D1C02", marginBottom: 14 }}>ကျွန်ုပ်တို့ရဲ့ စက်ရုံနဲ့ အရောင်းဆိုင်များသို့ ကြွလှမ်းခဲ့ပါ</h2>
                            <p style={{ fontSize: 16, color: "#7a5a3a", maxWidth: 500, margin: "0 auto" }}>စက်ရုံမှ မုန့်များကို လတ်လတ်ဆတ်ဆတ် လာရောက်မြည်းစမ်းနိုင်သလို
                                မန္တလေးမြို့အနှံ့ရှိ ကျွန်ုပ်တို့၏ ဆိုင်များတွင်လည်း ရှာဖွေဝယ်ယူနိုင်ပါသည်။</p>
                        </div>
                    </AnimSection>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
                        {STORE_LOCATIONS.map((loc, i) => (
                            <AnimSection key={loc.name} delay={i * 0.12}>
                                <div style={{
                                    padding: "28px", borderRadius: 20, height: "100%",
                                    background: loc.highlight ? "linear-gradient(135deg, #C4501A, #8B1A1A)" : "#fff",
                                    border: loc.highlight ? "none" : "1px solid #f0e6d3",
                                    boxShadow: loc.highlight ? "0 20px 60px rgba(196,80,26,0.3)" : "0 4px 20px rgba(0,0,0,0.05)",
                                    color: loc.highlight ? "#fff" : "#3D1C02",
                                }}>
                                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: loc.highlight ? "rgba(255,255,255,0.8)" : "#C4501A", letterSpacing: "0.5px" }}>{loc.type}</div>
                                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, marginBottom: 14 }}>{loc.name}</h3>
                                    <div style={{ fontSize: 14, lineHeight: 1.7, color: loc.highlight ? "rgba(255,255,255,0.85)" : "#5a3d28", marginBottom: 16 }}>{loc.addr}</div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, opacity: 0.75 }}>
                                            <Clock size={14} /><span>{loc.hours}</span>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, opacity: 0.75 }}>
                                            <Phone size={14} /><span>{loc.phone}</span>
                                        </div>
                                    </div>
                                    <button style={{
                                        width: "100%", padding: "12px", borderRadius: 12,
                                        border: loc.highlight ? "1px solid rgba(255,255,255,0.3)" : "1.5px solid #C4501A",
                                        background: loc.highlight ? "rgba(255,255,255,0.15)" : "transparent",
                                        color: loc.highlight ? "#fff" : "#C4501A",
                                        fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "inherit",
                                    }}>
                                        {loc.type.includes("အွန်လိုင်း") ? "အွန်လိုင်းမှ မှာယူမည် →" : "လမ်းညွှန်ကြည့်မည် →"}
                                    </button>
                                </div>
                            </AnimSection>
                        ))}
                    </div>

                    {/* Extra info */}
                    <AnimSection delay={0.3}>
                        <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
                            {([
                                ["🚚", "ပို့ခအခမဲ့ ဝန်ဆောင်မှု", "မန္တလေးမြို့အတွင်း ၃၀,၀၀၀ ကျပ် အထက် မှာယူပါက ပို့ဆောင်ခ အခမဲ့"],
                                ["🎀", "လက်ဆောင်ထုပ်ပိုးမှု", "မန္တလေးရိုးရာ အထည်ဖြင့် လှပစွာ ထုပ်ပိုးပေးနိုင်ပါသည်"],
                                ["📱", "Viber မှ မှာယူရန်", "Viber မှတစ်ဆင့် အမြန်ဆုံး မှာယူနိုင်ပါသည် 📞 +959 955 756 469"],
                                ["♻️", "သဘာဝပတ်ဝန်းကျင်ကို ချစ်မြတ်နိုးခြင်း", "ထုပ်ပိုးမှုအားလုံးသည် သဘာဝပတ်ဝန်းကျင်ကို မထိခိုက်စေသော ပစ္စည်းများဖြင့်သာ ပြုလုပ်ထားပါသည်။"],
                            ] as [string, string, string][]).map(([icon, title, desc]) => (
                                <div key={title} style={{ padding: "20px", borderRadius: 16, background: "#fdf5ea", border: "1px solid #f0e6d3", textAlign: "center" }}>
                                    <div style={{ fontSize: 30, marginBottom: 10 }}>{icon}</div>
                                    <div style={{ fontWeight: 700, color: "#3D1C02", fontSize: 15, marginBottom: 6 }}>{title}</div>
                                    <div style={{ fontSize: 13, color: "#7a5a3a", lineHeight: 1.5 }}>{desc}</div>
                                </div>
                            ))}
                        </div>
                    </AnimSection>
                </div>
            </section>

            {/* ── CTA Banner ── */}
            <section style={{ padding: "0 24px 80px", maxWidth: 1200, margin: "0 auto" }}>
                <AnimSection>
                    <div style={{ borderRadius: 28, background: "linear-gradient(135deg, #D4A017 0%, #C4501A 60%, #8B1A1A 100%)", padding: "60px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", inset: 0, opacity: 0.07, pointerEvents: "none" }}>
                            {Array.from({ length: 6 }).map((_, i) => (
                                <span key={i} style={{ position: "absolute", fontSize: 80, top: `${[10, 40, 70, 20, 60, 50][i]}%`, left: `${[5, 20, 50, 70, 85, 40][i]}%`, opacity: 0.5 }}>🎑</span>
                            ))}
                        </div>
                        <div style={{ position: "relative", zIndex: 2 }}>
                            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 800, color: "#fff", marginBottom: 12 }}>ယနေ့ပဲ လတ်ဆတ်စွာ မှာယူနိုင်ပါသည်</h2>
                            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", maxWidth: 480, margin: "0 auto 32px" }}>
                                မုန့်များအားလုံးကို နေ့စဉ် မနက်တိုင်း လတ်ဆတ်စွာ ပြုလုပ်ထားပါသည်။ မန္တလေးမြို့အတွင်း တစ်နေ့တည်း ပို့ဆောင်ပေးနိုင်ပါသည်။
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => scrollTo("products")}
                                style={{ padding: "16px 36px", borderRadius: 14, border: "none", background: "#fff", color: "#C4501A", fontWeight: 800, fontSize: 17, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 8px 30px rgba(0,0,0,0.2)" }}
                            >
                                မုန့်အမျိုးအစားများအားလုံး ကြည့်ရှုရန် 🛍️
                            </motion.button>
                        </div>
                    </div>
                </AnimSection>
            </section>

            {/* ── Footer ── */}
            <footer id="footer" style={{ background: "#1a0a00", color: "rgba(255,255,255,0.75)", padding: "60px 24px 0" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                                <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg, #C4501A, #8B1A1A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🎑</div>
                                <div>
                                    <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 18, color: "#fff" }}>MMC</div>
                                    <div style={{ fontSize: 10, color: "#a08060", letterSpacing: "1.5px" }}>မြင့်မြင့်ချို</div>
                                </div>
                            </div>
                            <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", margin: "0 0 24px" }}>
                                ၂၀၀၅ ခုနှစ်မှစတင်၍
                                အစဉ်အလာ၊ စိတ်စေတနာနှင့် ဒေသထွက် အကောင်းဆုံးပါဝင်ပစ္စည်းများဖြင့် ပြုလုပ်ထားသော မြန်မာရိုးရာ မုန့်များ
                            </p>



                            <div style={{ display: "flex", gap: 16 }}>
                                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" style={{ color: "#fff" }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                                </a>
                                <a href={SOCIAL_LINKS.messenger} target="_blank" rel="noreferrer" style={{ color: "#fff" }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14c.9 0 1.8.1 2.7.4a8.5 8.5 0 0 1 5.8 9.8Z" /></svg>
                                </a>
                                <a href={SOCIAL_LINKS.viber} style={{ color: "#fff" }}>
                                    {/* Custom Viber Icon or Phone Icon */}
                                    <Phone size={22} />
                                </a>
                            </div>
                        </div>

                        {/* Dynamic Links */}
                        {FOOTER_COLUMNS.map((col) => (
                            <div key={col.title}>
                                <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: "#C4501A" }}>{col.title}</h4>
                                <ul style={{ listStyle: "none" }}>
                                    {col.links.map((link) => (
                                        <li key={link.name} style={{ marginBottom: 12 }}>
                                            <button
                                                onClick={() => scrollTo(link.id)}
                                                style={{
                                                    background: "none", border: "none", color: "#c0a080",
                                                    fontSize: 14, cursor: "pointer", transition: "color 0.2s"
                                                }}
                                                onMouseOver={(e) => (e.currentTarget.style.color = "#fff")}
                                                onMouseOut={(e) => (e.currentTarget.style.color = "#c0a080")}
                                            >
                                                {link.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div style={{ padding: "24px 0", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>© 2026 Myint Myint Cho (MMC). All rights reserved.</div>
                        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>🏮 Handcrafted in Mandalay, Myanmar · မန္တလေးမြို့မှ ချစ်ခြင်းမေတ္တာဖြင့် ❤️</div>
                    </div>
                </div>
            </footer>
        </div>
    );
}