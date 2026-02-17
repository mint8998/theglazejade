"use client";
import React, { useState } from 'react';

export default function Home() {
  const [view, setView] = useState('shop'); // shop, cart, admin
  const [cart, setCart] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [address, setAddress] = useState('');
  const [u, setU] = useState('');
  const [p, setP] = useState('');

  const shapes = ["Square", "Oval", "พส.เวียดนาม", "พส.จีน"];
  const price = 200; // กำหนดราคาสินค้าต่อชิ้น

  // เพิ่มลงตะกร้า (หน้าแรก)
  const addToCart = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const item = {
      id: Date.now(),
      shape: fd.get('shape'),
      len: fd.get('len'),
      price: price,
      date: new Date().toLocaleDateString()
    };
    setCart([...cart, item]);
    alert('เพิ่มลงตะกร้าแล้ว!');
  };

  // เลือก/ยกเลิกสินค้าในตะกร้า
  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const selectedItems = cart.filter(i => selectedIds.includes(i.id));
  const total = selectedItems.reduce((sum, i) => sum + i.price, 0);

  if (view === 'admin') {
    return (
      <div style={{ padding: '20px' }}>
        <h2>แอดมิน: ตรวจสอบออเดอร์ (1-8)</h2>
        <input type="date" /> ถึง <input type="date" />
        <button onClick={() => setView('shop')}>กลับหน้าหลัก</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff5f7', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#d63384' }}>💅 GLAZED JADE</h1>
        <button onClick={() => setView('cart')} style={{ fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer' }}>🛒 ({cart.length})</button>
      </header>

      {/* หน้าแรก: เพิ่มลงตะกร้า */}
      {view === 'shop' && (
        <form onSubmit={addToCart} style={{ maxWidth: '400px', margin: 'auto', background: 'white', padding: '20px', borderRadius: '15px' }}>
          <h3>เลือกทรงเล็บที่ต้องการ</h3>
          <select name="shape" style={{ width: '100%', padding: '10px', marginBottom: '10px' }}>
            {shapes.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select name="len" style={{ width: '100%', padding: '10px', marginBottom: '10px' }}>
            <option>สั้น</option><option>กลาง</option><option>ยาว</option>
          </select>
          <button type="submit" style={{ width: '100%', padding: '12px', background: '#d63384', color: 'white', border: 'none', borderRadius: '25px' }}>เพิ่มลงตะกร้า</button>
        </form>
      )}

      {/* หน้าตะกร้า: ติ๊กเลือกและกรอกที่อยู่ */}
      {view === 'cart' && (
        <div style={{ maxWidth: '450px', margin: 'auto', background: 'white', padding: '20px', borderRadius: '15px' }}>
          <h3>ตะกร้าสินค้าของคุณ</h3>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee', padding: '10px 0' }}>
              <input type="checkbox" onChange={() => toggleSelect(item.id)} checked={selectedIds.includes(item.id)} />
              <div style={{ marginLeft: '10px' }}>{item.shape} ({item.len}) - {item.price}฿</div>
              <button onClick={() => setCart(cart.filter(i => i.id !== item.id))} style={{ marginLeft: 'auto', color: 'red' }}>ลบ</button>
            </div>
          ))}

          <div style={{ marginTop: '20px', borderTop: '2px solid #eee', paddingTop: '15px' }}>
            <p>ยอดรวมที่เลือก: <b>{total} บาท</b></p>
            <textarea 
              placeholder="กรุณากรอกที่อยู่จัดส่งเพื่อชำระเงิน" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)}
              style={{ width: '100%', height: '80px', padding: '10px', marginBottom: '10px' }}
            />
            
            {selectedIds.length > 0 && address.trim().length > 10 ? (
              <div style={{ textAlign: 'center', background: '#f0fff0', padding: '15px', borderRadius: '10px' }}>
                <p style={{ color: 'green', fontWeight: 'bold' }}>ที่อยู่ครบถ้วน สแกนจ่ายได้เลย</p>
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PROMPTPAY_${total}`} alt="QR" />
                <button style={{ width: '100%', padding: '12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '25px', marginTop: '10px' }}>ยืนยันแจ้งชำระเงิน</button>
              </div>
            ) : (
              <p style={{ color: 'red', textAlign: 'center' }}>⚠️ กรุณาเลือกสินค้าและกรอกที่อยู่ให้ครบเพื่อสั่งซื้อ</p>
            )}
          </div>
          <button onClick={() => setView('shop')} style={{ width: '100%', marginTop: '10px' }}>กลับไปเลือกเพิ่ม</button>
        </div>
      )}

      {/* แอดมินล็อกอิน */}
      <footer style={{ marginTop: '50px', textAlign: 'center', opacity: 0.3 }}>
        <input placeholder="admin" onChange={e => setU(e.target.value)} style={{ width: '60px' }} />
        <input type="password" placeholder="1-8" onChange={e => setP(e.target.value)} style={{ width: '60px' }} />
        <button onClick={() => { if(u==='admin' && p==='12345678') setView('admin'); else alert('รหัสผิด'); }}>Admin</button>
      </footer>
    </div>
  );
}
