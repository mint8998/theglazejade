"use client";
import React, { useState, useEffect } from 'react';

export default function NailShop() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ username: '', points: 0 });
  const [cart, setCart] = useState([]);
  const [adminU, setAdminU] = useState('');
  const [adminP, setAdminP] = useState('');
  
  // สถานะสำหรับการค้นหาของแอดมิน
  const [searchStart, setSearchStart] = useState('');
  const [searchEnd, setSearchEnd] = useState('');

  const nailShapes = [
    "ทรงเหลี่ยม (Square)", "ทรงมน (Oval)", "ทรงบัลเลต์ (Coffin)", 
    "พส.เวียดนาม (ปลายแหลมเฉี่ยว)", "พส.จีน (ทรงเหลี่ยมหรู/ติดอะไหล่)"
  ];

  // ฟังก์ชันเพิ่มของลงตะกร้า
  const addToCart = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newItem = {
      id: Date.now(),
      shape: formData.get('shape'),
      length: formData.get('length'),
      address: formData.get('address'),
      image: "รูปลายเล็บที่อัปโหลด",
      date: new Date().toISOString().split('T')[0]
    };
    setCart([...cart, newItem]);
    alert('เพิ่มลงตะกร้าแล้ว!');
    e.target.reset();
  };

  // ฟังก์ชันลบสินค้าในตะกร้า
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // เช็คระบบแอดมิน (admin / 12345678)
  const handleAdminLogin = () => {
    if (adminU === 'admin' && adminP === '12345678') setIsAdmin(true);
    else alert('รหัสแอดมินไม่ถูกต้อง');
  };

  if (isAdmin) {
    return (
      <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
        <h2 style={{ color: '#d63384' }}>ระบบจัดการหลังบ้าน (Admin)</h2>
        <div style={{ background: 'white', padding: '15px', borderRadius: '10px', marginBottom: '20px' }}>
          <h4>🔍 ดูคำสั่งซื้อตามช่วงวันที่</h4>
          <input type="date" onChange={(e) => setSearchStart(e.target.value)} /> ถึง <input type="date" onChange={(e) => setSearchEnd(e.target.value)} />
          <button style={{ marginLeft: '10px' }}>ค้นหาออเดอร์</button>
        </div>
        <div style={{ background: 'white', padding: '15px', borderRadius: '10px' }}>
          <h4>รายการคำสั่งซื้อทั้งหมด</h4>
          <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: '#eee' }}>
              <tr><th>วันที่</th><th>Account</th><th>ทรงเล็บ</th><th>ที่อยู่</th><th>สถานะ</th></tr>
            </thead>
            <tbody>
              <tr><td>2024-03-20</td><td>User_01</td><td>พส.เวียดนาม</td><td>ชลบุรี...</td><td>รอตรวจสลิปพร้อมเพย์</td></tr>
            </tbody>
          </table>
        </div>
        <button onClick={() => setIsAdmin(false)} style={{ marginTop: '20px' }}>กลับหน้าหลัก</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff5f7', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#d63384' }}>💅 GLAZED JADE</h1>
        <p>สั่งทำเล็บปลอมพส.จีน-เวียดนาม พร้อมระบบสะสมแต้ม</p>
      </header>

      <div style={{ maxWidth: '600px', margin: 'auto' }}>
        {/* ส่วนฟอร์มสั่งทำ */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <h3>✨ ออกแบบเล็บของคุณ</h3>
          <form onSubmit={addToCart}>
            <label>เลือกทรงเล็บ:</label>
            <select name="shape" style={{ width: '100%', padding: '10px', marginBottom: '15px' }}>
              {nailShapes.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <label>ความยาว:</label>
            <select name="length" style={{ width: '100%', padding: '10px', marginBottom: '15px' }}>
              <option>สั้น</option><option>กลาง</option><option>ยาว</option>
            </select>

            <label>อัปโหลดรูปลายที่ต้องการ:</label>
            <input type="file" style={{ marginBottom: '15px' }} />

            <label>ที่อยู่จัดส่ง:</label>
            <textarea name="address" required style={{ width: '100%', height: '60px', padding: '10px', marginBottom: '15px' }} placeholder="กรอกที่อยู่รับของ..."></textarea>

            <button type="submit" style={{ width: '100%', padding: '12px', background: '#d63384', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold' }}>
              เพิ่มลงตะกร้า 🛒
            </button>
          </form>
        </div>

        {/* ส่วนตะกร้าสินค้า */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '15px', marginTop: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <h3>🛒 ตะกร้าสินค้าของคุณ</h3>
          {cart.length === 0 ? <p>ยังไม่มีสินค้าในตะกร้า</p> : cart.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
              <div>
                <strong>{item.shape}</strong> ({item.length})<br/>
                <small>วันที่สั่ง: {item.date}</small>
              </div>
              <button onClick={() => removeFromCart(item.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>ลบ 🗑️</button>
            </div>
          ))}
          {cart.length > 0 && (
            <div style={{ marginTop: '20px', textAlign: 'center', borderTop: '2px solid #fce4ec', paddingTop: '15px' }}>
              <p>ยอดชำระผ่าน <b>พร้อมเพย์</b></p>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PROMPTPAY" alt="QR" style={{ width: '120px' }} />
              <button style={{ width: '100%', padding: '15px', background: '#28a745', color: 'white', border: 'none', borderRadius: '25px', marginTop: '10px', fontWeight: 'bold' }}>ชำระเงินและรับแต้มสะสม</button>
            </div>
          )}
        </div>
      </div>

      <footer style={{ marginTop: '50px', textAlign: 'center', opacity: 0.5 }}>
        <p>พื้นที่แอดมิน (ดูออเดอร์ย้อนหลัง)</p>
        <input placeholder="User" onChange={e => setAdminU(e.target.value)} style={{ width: '80px', marginRight: '5px' }} />
        <input type="password" placeholder="Pass" onChange={e => setAdminP(e.target.value)} style={{ width: '80px', marginRight: '5px' }} />
        <button onClick={handleAdminLogin}>Login Admin</button>
      </footer>
    </div>
  );
}
