"use client";
import { useState, useEffect } from "react";

const ADMIN = {
username: "admin",
password: "12345678",
};

export default function Home() {
const [page, setPage] = useState("login");
const [user, setUser] = useState<any>(null);
const [users, setUsers] = useState<any[]>([]);
const [orders, setOrders] = useState<any[]>([]);

const [form, setForm] = useState({
username: "",
password: "",
});

const [orderForm, setOrderForm] = useState({
shape: "Almond",
address: "",
image: "",
});

useEffect(() => {
const u = JSON.parse(localStorage.getItem("users") || "[]");
const o = JSON.parse(localStorage.getItem("orders") || "[]");
const cu = JSON.parse(localStorage.getItem("currentUser") || "null");

```
setUsers(u);
setOrders(o);
if (cu) {
  setUser(cu);
  setPage(cu.admin ? "admin" : "dashboard");
}
```

}, []);

const saveAll = (u:any, o:any) => {
setUsers(u);
setOrders(o);
localStorage.setItem("users", JSON.stringify(u));
localStorage.setItem("orders", JSON.stringify(o));
};

const register = () => {
if (!form.username || !form.password) return alert("กรอกข้อมูล");

```
if (users.find(u => u.username === form.username))
  return alert("มีผู้ใช้นี้แล้ว");

const newUsers = [
  ...users,
  { username: form.username, password: form.password, points: 0 },
];

saveAll(newUsers, orders);
alert("สมัครสำเร็จ");
setPage("login");
```

};

const login = () => {
if (
form.username === ADMIN.username &&
form.password === ADMIN.password
) {
const adminUser = { username: "admin", admin: true };
setUser(adminUser);
localStorage.setItem("currentUser", JSON.stringify(adminUser));
setPage("admin");
return;
}

```
const found = users.find(
  u =>
    u.username === form.username &&
    u.password === form.password
);

if (!found) return alert("ไม่พบผู้ใช้");

setUser(found);
localStorage.setItem("currentUser", JSON.stringify(found));
setPage("dashboard");
```

};

const logout = () => {
localStorage.removeItem("currentUser");
setUser(null);
setPage("login");
};

const uploadImage = (e:any) => {
const file = e.target.files[0];
const reader = new FileReader();
reader.onload = () => {
setOrderForm({
...orderForm,
image: reader.result as string,
});
};
reader.readAsDataURL(file);
};

const createOrder = () => {
const newOrder = {
id: Date.now(),
user: user.username,
...orderForm,
status: "รอตรวจสอบการชำระเงิน",
date: new Date().toLocaleString(),
};

```
const newOrders = [...orders, newOrder];

const newUsers = users.map(u =>
  u.username === user.username
    ? { ...u, points: (u.points || 0) + 10 }
    : u
);

saveAll(newUsers, newOrders);

alert("สั่งซื้อสำเร็จ ได้รับ 10 แต้ม");
```

};

const updateStatus = (id:number, status:string) => {
const newOrders = orders.map(o =>
o.id === id ? { ...o, status } : o
);
saveAll(users, newOrders);
};

const addPoints = (username:string) => {
const newUsers = users.map(u =>
u.username === username
? { ...u, points: (u.points || 0) + 20 }
: u
);
saveAll(newUsers, orders);
};

const theme = {
bg: "#e8efe9",
primary: "#8FAF9B",
gold: "#C6A769",
};

const container:any = {
background: theme.bg,
minHeight: "100vh",
padding: 20,
fontFamily: "Arial",
};

const card:any = {
maxWidth: 500,
margin: "auto",
background: "white",
padding: 20,
borderRadius: 20,
boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
};

const btn:any = {
width: "100%",
padding: 12,
marginTop: 10,
background: theme.primary,
color: "white",
border: "none",
borderRadius: 10,
};

if (page === "login")
return ( <div style={container}> <div style={card}>
<h1 style={{ textAlign: "center", color: theme.primary }}>
GLAZED JADE ✨ </h1>

```
      <input
        placeholder="Username"
        onChange={e =>
          setForm({ ...form, username: e.target.value })
        }
      />
      <input
        placeholder="Password"
        type="password"
        onChange={e =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button style={btn} onClick={login}>
        Login
      </button>
      <button style={btn} onClick={() => setPage("register")}>
        Register
      </button>
    </div>
  </div>
);
```

if (page === "register")
return ( <div style={container}> <div style={card}> <h2>สมัครสมาชิก</h2>

```
      <input
        placeholder="Username"
        onChange={e =>
          setForm({ ...form, username: e.target.value })
        }
      />
      <input
        placeholder="Password"
        type="password"
        onChange={e =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button style={btn} onClick={register}>
        สมัคร
      </button>
      <button style={btn} onClick={() => setPage("login")}>
        กลับ
      </button>
    </div>
  </div>
);
```

if (page === "dashboard") {
const myUser = users.find(u => u.username === user.username);

```
return (
  <div style={container}>
    <div style={card}>
      <h2>สวัสดี {user.username}</h2>
      <p>แต้มสะสม: {myUser?.points || 0}</p>

      <h3>สั่งทำเล็บ</h3>

      <select
        onChange={e =>
          setOrderForm({
            ...orderForm,
            shape: e.target.value,
          })
        }
      >
        <option>Almond</option>
        <option>Square</option>
        <option>Coffin</option>
        <option>Oval</option>
      </select>

      <input
        placeholder="ที่อยู่จัดส่ง"
        onChange={e =>
          setOrderForm({
            ...orderForm,
            address: e.target.value,
          })
        }
      />

      <input type="file" onChange={uploadImage} />

      <div style={{marginTop:10}}>
        💰 พร้อมเพย์: 0619138998
      </div>

      <button style={btn} onClick={createOrder}>
        สั่งซื้อ
      </button>

      <h3>ออเดอร์ของฉัน</h3>

      {orders
        .filter(o => o.user === user.username)
        .map(o => (
          <div key={o.id} style={{border:"1px solid #ddd",padding:10,marginTop:10}}>
            <p>ทรง: {o.shape}</p>
            <p>สถานะ: {o.status}</p>
            <p>{o.date}</p>
          </div>
        ))}

      <button style={btn} onClick={logout}>
        Logout
      </button>
    </div>
  </div>
);
```

}

if (page === "admin")
return ( <div style={container}> <div style={card}> <h2>ADMIN PANEL</h2>

```
      {orders.map(o => (
        <div key={o.id} style={{border:"1px solid #ccc",padding:10,marginTop:10}}>
          <p>ลูกค้า: {o.user}</p>
          <p>ทรง: {o.shape}</p>
          <p>ที่อยู่: {o.address}</p>
          <p>สถานะ: {o.status}</p>

          <button style={btn} onClick={()=>updateStatus(o.id,"กำลังทำ")}>
            กำลังทำ
          </button>

          <button style={btn} onClick={()=>updateStatus(o.id,"จัดส่งแล้ว")}>
            จัดส่งแล้ว
          </button>

          <button style={btn} onClick={()=>addPoints(o.user)}>
            +20 แต้ม
          </button>
        </div>
      ))}

      <button style={btn} onClick={logout}>
        Logout
      </button>
    </div>
  </div>
);
```

return null;
}
