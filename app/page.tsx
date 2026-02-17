"use client";
import React, { useState } from 'react';

export default function Home() {
  // --- States สำหรับระบบต่างๆ ---
  const [cartCount, setCartCount] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [points, setPoints] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [u, setU] = useState('');
  const [p, setP] = useState('');

  // ฟังก์ชันกดสั่งซื้อแล้วเพิ่มเลขในตะกร้า
  const addToCart = () => {
    setCartCount(cartCount + 1);
    alert("เพิ่มลงตะกร้าเรียบร้อย! อย่าลืมกดสั่งซื้อเพื่อรับแต้ม");
  };

  // ฟังก์ชันเช็ค Admin (user: admin / pass: 12345678)
  const checkAdmin = () => {
    if (u === 'admin' && p === '12345678') setIsAdmin(true);
    else alert('รหัสผ่านแอดมินไม่ถูกต้อง');
  };

  if (isAdmin) {
    return (
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h1 style={{ color: '#d63384' }}>Admin Dashboard (เชื่อมต่อ Excel)</h1>
        <p>ดึงข้อมูลจาก Google Sheets เพื่อดูออเดอร์ล่าสุด</p>
        <div style={{ border: '2px solid #eee', padding: '15px' }}>
          <p><b>รายการล่าสุด:</b> ทรง Oval / ที่อยู่: จันทบุรี / รูปภาพ: [Link]</p>
        </div>
        <button onClick={() => setIsAdmin(false)} style={{ marginTop: '20px' }}>กลับหน้าแรก</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '10px', backgroundColor: '#fff5f7', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* ส่วนที่ 1: แถบไอคอนด้านบน (Header Icons) */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', padding: '10px', fontSize: '24px' }}>
        <span onClick={() => setShowLogin(true)} style={{ cursor: 'pointer' }}>👤</span>
        <span style={{ cursor: 'pointer' }}>🛒 <small style={{ fontSize: '14px', color: 'red' }}>{cartCount}</small></span>
        <span style={{ cursor: 'pointer' }}>🤍</span>
        <span style={{ cursor: 'pointer' }}>🎧</span>
        <span style={{ cursor: 'pointer' }}>🌐</span>
      </div>

      {/* หน้าเด้ง Login (Modal) */}
      {showLogin && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', textAlign: 'center' }}>
            <h2>เข้าสู่ระบบเพื่อสะสมแต้ม</h2>
            <input 
              placeholder="กรอกชื่อของคุณ" 
              onChange={(e) => setCustomerName(e.target.value)}
              style={{ padding: '10px', width: '200px', marginBottom: '10px' }} 
            />
            <br />
            <button onClick={() => { setShowLogin(false); setPoints(10); }} style={{ backgroundColor: '#d63384', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '10px' }}>
              ตกลง (รับ 10 แต้มฟรี)
            </button>
          </div>
        </div>
      )}

      {/* ส่วนที่ 2: เนื้อหาหลัก */}
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#d63384', fontSize: '32px' }}>💅 GLAZED JADE</h1>
        {customerName && <p>สวัสดีคุณ: <b>{customerName}</b> | แต้มสะสม: <b style={{ color: '#d63384' }}>{points}</b></p>}
      </header>

      <div style={{ maxWidth: '500px', margin: 'auto', backgroundColor: 'white', padding: '20px', borderRadius: '20px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <h3>สั่งทำเล็บปลอม</h3>
        <select style={{ width: '100%', padding: '10px', marginBottom: '10px' }}>
          <option>เลือกทรงเล็บ</option><option>Square</option><option>Oval</option>
        </select>
        <input type="file" style={{ marginBottom: '15px' }} />
        <textarea placeholder="ที่อยู่จัดส่ง" style={{ width: '100%', height: '60px', marginBottom: '15px' }}></textarea>
        
        <button 
          onClick={addToCart}
          style={{ width: '100%', backgroundColor: '#d63384', color: 'white', padding: '15px', border: 'none', borderRadius: '30px', fontWeight: 'bold' }}
        >
          ใส่ตะกร้า / สั่งซื้อ
        </button>
      </div>

      {/* ส่วนที่ 3: แอดมินล็อกอิน */}
      <footer style={{ marginTop: '50px', textAlign: 'center', opacity: 0.5 }}>
        <p style={{ fontSize: '12px' }}>Admin Area</p>
        <input placeholder="User" onChange={e => setU(e.target.value)} style={{ width: '80px' }} />
        <input type="password" placeholder="Pass" onChange={e => setP(e.target.value)} style={{ width: '80px' }} />
        <button onClick={checkAdmin}>Login</button>
      </footer>
    </div>
  );
}
