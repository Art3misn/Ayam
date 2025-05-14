const data = [
    {
      nama: "Paha Ayam",
      harga: 15000,
      stok: 5,
      gambar: "img/Paha.jpg"
    },
    {
      nama: "Dada Ayam",
      harga: 17000,
      stok: 3,
      gambar: "img/Dada.jpg"
    },
    {
      nama: "Sayap Ayam",
      harga: 13000,
      stok: 0, // contoh stok habis
      gambar: "img/Sayap.jpg"
    }
  ];
  
  
  const itemList = document.getElementById('item-list');
  const totalHargaEl = document.getElementById('total-harga');
  const beliBtn = document.getElementById('beli-btn');
  const popup = document.getElementById('popup');
  
  let total = 0;
  let pesanan = {};
  
  function updateTotal() {
    total = 0;
    for (const item of data) {
      const jumlah = pesanan[item.nama] || 0;
      total += jumlah * item.harga;
    }
    totalHargaEl.textContent = "Rp " + total.toLocaleString();
  }
  
  data.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item';
  
    const tersedia = item.stok > 0;
    const deskripsi = tersedia
      ? `<span class="stok tersedia">Stok tersedia: ${item.stok}</span>`
      : `<span class="stok kosong">Stok habis</span>`;
  
    div.innerHTML = `
      <img src="${item.gambar}" alt="${item.nama}" />
      <h3>${item.nama}</h3>
      <p>Rp ${item.harga.toLocaleString()}</p>
      ${deskripsi}
      <div class="counter">
        <button onclick="ubahJumlah('${item.nama}', -1)" ${!tersedia ? "disabled" : ""}>-</button>
        <span id="qty-${item.nama}">0</span>
        <button onclick="ubahJumlah('${item.nama}', 1)" ${!tersedia ? "disabled" : ""}>+</button>
      </div>
    `;
  
    itemList.appendChild(div);
  });
  
  
  window.ubahJumlah = function(nama, delta) {
    pesanan[nama] = (pesanan[nama] || 0) + delta;
    if (pesanan[nama] < 0) pesanan[nama] = 0;
    document.getElementById(`qty-${nama}`).textContent = pesanan[nama];
    updateTotal();
  };
  
  beliBtn.addEventListener('click', () => {
    const nomorWA = "6281234567890"; // ganti dengan nomormu
    let pesan = "Halo, saya ingin memesan:\n";
  
    Object.keys(pesanan).forEach(nama => {
      if (pesanan[nama] > 0) {
        pesan += `- ${nama} x${pesanan[nama]}\n`;
      }
    });
  
    pesan += `Total: Rp ${total.toLocaleString()}\n\n`;
    pesan += `Silakan pilih metode pembayaran:\n`;
    pesan += `1. COD\n2. Transfer Bank (BCA/BRI)\n3. QRIS: https://imagekit.io/tools/asset-public-link?detail=%7B%22name%22%3A%22QR.png%22%2C%22type%22%3A%22image%2Fpng%22%2C%22signedurl_expire%22%3A%222028-05-13T12%3A49%3A22.711Z%22%2C%22signedUrl%22%3A%22https%3A%2F%2Fmedia-hosting.imagekit.io%2Ff85551ea07374dbe%2FQR.png%3FExpires%3D1841834963%26Key-Pair-Id%3DK2ZIVPTIP2VGHC%26Signature%3DSQSBaDPoxRfYE9vLYr4JxJp5y5Hjd1WUfdYr90Xok3084E5ygoxxo2bDYK6OLEZenw6f70LFwbHOAOikHojtPoJicHVKaE2Khu0JMup~Hnqjo1XNlG7ypOPhZyFRXB4FrrHn5P9ysITLlv~P5xupE4IMf64X4pz8LTSxLdroO6CHFET8MGvr-X~sw7YC2QujFKpjToaFWIi~0AAU2M1rVMkusIowNm6D3dFDw-VneSW6RqEIcZNq55SyO3WPGTla41jKyW4YI27OIWbZwjSeDkayuK3JGO9Jzhu7z-tEP7zbDevSG76g~-VKIa8csjv9o4yNz34N-KiCbCyFJGipzA__%22%7D\n`;
    pesan += `\nJika menggunakan QRIS, silakan scan gambar di link di atas.`;
    
    const url = `https://wa.me/6287835333349?text=${encodeURIComponent(pesan)}`;
  
    popup.style.display = 'block';
    setTimeout(() => {
      window.location.href = url;
      Object.keys(pesanan).forEach(nama => {
  const item = data.find(i => i.nama === nama);
  if (item && item.stok >= pesanan[nama]) {
    item.stok -= pesanan[nama];
  }
});
pesanan = {};
setTimeout(() => location.reload(), 2000); // reset halaman setelah 2 detik

    }, 1500);
  });
  
  const tanyaBtn = document.getElementById('tanya-btn');
if (tanyaBtn) {
  tanyaBtn.addEventListener('click', () => {
    const nomorWA = "6281234567890"; // ganti dengan nomor kamu
    const pesan = "Halo, saya ingin bertanya tentang produk ayam potong.";
    const url = `https://wa.me/6287835333349?text=${encodeURIComponent(pesan)}`;
    window.location.href = url;
  });
}


