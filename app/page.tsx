export default function Home() {
  return (
    <div style={{
      fontFamily: "Arial",
      background: "#e8efe9",
      minHeight: "100vh",
      padding: 20
    }}>
      <div style={{
        maxWidth: 500,
        margin: "auto",
        background: "white",
        padding: 20,
        borderRadius: 15
      }}>
        <h1 style={{textAlign:"center",color:"#8FAF9B"}}>
          GLAZED JADE ✨
        </h1>

        <p style={{textAlign:"center"}}>
          061-913-8998
        </p>

        <h3>สั่งทำเล็บ</h3>

        <select style={{width:"100%",padding:10}}>
          <option>Almond</option>
          <option>Square</option>
          <option>Coffin</option>
          <option>Oval</option>
        </select>

        <input
          placeholder="ที่อยู่จัดส่ง"
          style={{width:"100%",padding:10,marginTop:10}}
        />

        <button style={{
          width:"100%",
          padding:12,
          marginTop:10,
          background:"#8FAF9B",
          color:"white",
          border:"none",
          borderRadius:10
        }}>
          สั่งซื้อ
        </button>

        <p style={{marginTop:20}}>
          ระบบสมาชิกและแอดมินจะเปิดใช้งานหลัง Deploy
        </p>

      </div>
    </div>
  );
}
