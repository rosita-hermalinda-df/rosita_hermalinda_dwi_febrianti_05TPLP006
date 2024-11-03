const formKaryawan = document.getElementById('form-karyawan');
const tabelKaryawan = document.getElementById('tabels-data-karyawan');
const pesanError = document.getElementById('pesan-error');

let dataKaryawan = []; // Array untuk menyimpan data karyawan

formKaryawan.addEventListener('submit', (event) => {
  event.preventDefault();

  const namaLengkap = document.getElementById('namaLengkap').value;
  const jenisKelamin = document.getElementById('jenis-kelamin').value;
  const email = document.getElementById('email').value;
  const noHP = document.getElementById('noHP').value;
  const alamat = document.getElementById('alamat').value;
  const password = document.getElementById('password').value;
  const jabatan = document.getElementById('jabatan').value;
  const divisi = document.getElementById('divisi').value;

  if (
    namaLengkap === '' ||
    jenisKelamin === '' ||
    email === '' ||
    noHP === '' ||
    alamat === '' ||
    password === '' ||
    jabatan === '' ||
    divisi === ''
  ) {
    pesanError.textContent = 'Lengkapi semua data!';
  } else {
    pesanError.textContent = '';

    // Tambahkan data karyawan ke array
    dataKaryawan.push({
      namaLengkap,
      jenisKelamin,
      email,
      noHP,
      alamat,
      password,
      jabatan,
      divisi,
    });

    // Urutkan data karyawan berdasarkan nama (ascending)
    dataKaryawan.sort((a, b) => {
      return a.namaLengkap.toLowerCase().localeCompare(b.namaLengkap.toLowerCase());
    });

    // Tambahkan data karyawan ke tabel
    renderTabelKaryawan();

    // Reset formulir
    formKaryawan.reset();
  }
});

function renderTabelKaryawan() {
  tabelKaryawan.innerHTML = ''; // Bersihkan tabel

  dataKaryawan.forEach((karyawan, index) => {
    const row = tabelKaryawan.insertRow();
    const noCell = row.insertCell();
    const namaCell = row.insertCell();
    const jenisKelaminCell = row.insertCell();
    const emailCell = row.insertCell();
    const noHPCell = row.insertCell();
    const alamatCell = row.insertCell();
    const jabatanCell = row.insertCell();
    const divisiCell = row.insertCell();
    const aksiCell = row.insertCell();

    noCell.textContent = index + 1;
    namaCell.textContent = karyawan.namaLengkap;
    jenisKelaminCell.textContent = karyawan.jenisKelamin;
    emailCell.textContent = karyawan.email;
    noHPCell.textContent = karyawan.noHP;
    alamatCell.textContent = karyawan.alamat;
    jabatanCell.textContent = karyawan.jabatan;
    divisiCell.textContent = karyawan.divisi;

    // Tambahkan tombol aksi (misalnya, edit dan hapus)
    aksiCell.innerHTML = `
      <button class="btn btn-warning btn-sm">Edit</button>
      <button class="btn btn-danger btn-sm">Hapus</button>
    `;
  });
}

// Fungsi sortTable (diperbaiki)
function sortTable(n) {
  const table = document.getElementById('tabels-data-karyawan'); // Perbaiki ID
  const rows = table.getElementsByTagName('tr');
  let switching = true;
  let dir = 'asc'; 
  let shouldSwitch;

  while (switching) {
    switching = false;
    let i = 1;
    while (i < rows.length - 1) {
      shouldSwitch = false;
      let x = rows[i].getElementsByTagName('td')[n];
      let y = rows[i + 1].getElementsByTagName('td')[n];

      if (dir === 'asc') {
        if (x.textContent.toLowerCase() > y.textContent.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir === 'desc') {
        if (x.textContent.toLowerCase() < y.textContent.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
      i++;
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    } else {
      dir = (dir === 'asc') ? 'desc' : 'asc';
      switching = true;
    }
  }
}

// Panggil fungsi sortTable saat halaman dimuat
window.onload = function() {
  renderTabelKaryawan(); // Render tabel pertama kali
  sortTable(1);  // Urutkan tabel berdasarkan kolom Nama Lengkap (index 1)
}