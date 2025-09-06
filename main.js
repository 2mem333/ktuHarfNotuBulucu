 //c++ ile yazilmis kaynak kod: github.com/2mem333/ktuHarfNotuBulucu
 //kod 17.06.2025 tarihinde yazildi. Gelecek bir tarihten bakiyorsaniz, eksiklikler olabilir.
 //gelistirilmesi gereken noktalar oldugunu dusunuyorsaniz iletisime geciniz.
 class harfliNotHesaplama {
      constructor(so, ss, vn, fn) {
        this.sinif_ortalamasi = so;
        this.standart_sapma = ss;
        this.vize_notu = vn;
        this.final_notu = fn;
        this.t_degeri = 0;
        this.harfNotDegeri = 0;
        this.harfNotu = 'NOT INIT';
      }

      harfNotuCevir(katsayi) {
        if (katsayi === 0.0) return 'FF';
        else if (katsayi === 0.5) return 'FD';
        else if (katsayi === 1.0) return 'DD';
        else if (katsayi === 1.5) return 'DC';
        else if (katsayi === 2.0) return 'CC';
        else if (katsayi === 2.5) return 'CB';
        else if (katsayi === 3.0) return 'BB';
        else if (katsayi === 3.5) return 'BA';
        else if (katsayi === 4.0) return 'AA';
        else return `ERROR katsayi (${katsayi})`;
      }

      tDegeriHesapla() {
        const ogrenci_ortalama = (this.vize_notu + this.final_notu) / 2;
        let t = (ogrenci_ortalama - this.sinif_ortalamasi) / this.standart_sapma * 10 + 50;
        this.t_degeri = Math.floor(t * 100) / 100.0;
      }

      tDegeriIleHarfNotu(sinir) {
        let notdegeri = 0;
        if (this.t_degeri < sinir) return notdegeri;
        for (let i = 1; i <= 8; i++) {
          notdegeri += 0.5;
          if (this.t_degeri >= sinir && this.t_degeri <= sinir + 5 - 0.01) return notdegeri;
          sinir += 5;
        }
        return notdegeri;
      }

      mutlakSistemeGoreHarfNotu() {
        const ogrenci_ortalama = (this.vize_notu + this.final_notu) / 2;
        if (ogrenci_ortalama >= 90) return 4.0;
        if (ogrenci_ortalama >= 80) return 3.5;
        if (ogrenci_ortalama >= 75) return 3.0;
        if (ogrenci_ortalama >= 70) return 2.5;
        if (ogrenci_ortalama >= 60) return 2.0;
        if (ogrenci_ortalama >= 50) return 1.5;
        if (ogrenci_ortalama >= 40) return 1.0;
        if (ogrenci_ortalama >= 30) return 0.5;
        if (ogrenci_ortalama <= 29) return 0.0;
      }

      terstenTGoreHarfNotu(sinir) {
        const results = [];
        let notdegeri = 1;
        for (let i = 1; i <= 6; i++) {
          notdegeri += 0.5;
          const minimum_alinmasi_gereken = 2 * ((sinir - 50) * this.standart_sapma / 10 + this.sinif_ortalamasi) - this.vize_notu;
          results.push({ harf: this.harfNotuCevir(notdegeri), minFinal: Math.floor(minimum_alinmasi_gereken * 100) / 100.0 });
          sinir += 5;
        }
        return results;
      }

      terstenMutlakDegereGoreHarfNotu() {
        return [
          { harf: 'AA', minFinal: 2 * 90 - this.vize_notu },
          { harf: 'BA', minFinal: 2 * 80 - this.vize_notu },
          { harf: 'BB', minFinal: 2 * 75 - this.vize_notu },
          { harf: 'CB', minFinal: 2 * 70 - this.vize_notu },
          { harf: 'CC', minFinal: 2 * 60 - this.vize_notu },
          { harf: 'DC', minFinal: 2 * 50 - this.vize_notu }
        ].map(item => ({ harf: item.harf, minFinal: Math.floor(item.minFinal * 100) / 100.0 }));
      }

      harfNotuBul() {
        this.tDegeriHesapla();
        let notdegeri;
        if (this.sinif_ortalamasi >= 80 && this.sinif_ortalamasi <= 100) {
          notdegeri = this.mutlakSistemeGoreHarfNotu();
        }
        if (this.sinif_ortalamasi > 70 && this.sinif_ortalamasi < 80) notdegeri = this.tDegeriIleHarfNotu(24);
        if (this.sinif_ortalamasi > 62.5 && this.sinif_ortalamasi <= 70) notdegeri = this.tDegeriIleHarfNotu(26);
        if (this.sinif_ortalamasi > 57.5 && this.sinif_ortalamasi <= 62.5) notdegeri = this.tDegeriIleHarfNotu(28);
        if (this.sinif_ortalamasi > 52.5 && this.sinif_ortalamasi <= 57.5) notdegeri = this.tDegeriIleHarfNotu(30);
        if (this.sinif_ortalamasi > 47.5 && this.sinif_ortalamasi <= 52.5) notdegeri = this.tDegeriIleHarfNotu(32);
        if (this.sinif_ortalamasi > 42.5 && this.sinif_ortalamasi <= 47.5) notdegeri = this.tDegeriIleHarfNotu(34);
        if (this.sinif_ortalamasi <= 42.5) notdegeri = this.tDegeriIleHarfNotu(36);
        if(this.final_notu < 45) notdegeri = 0;
        this.harfNotDegeri = notdegeri;
        this.harfNotu = this.harfNotuCevir(notdegeri);
      }

      terstenHesaplaFinalBut() {
        if (this.sinif_ortalamasi >= 80 && this.sinif_ortalamasi <= 100) {
          return this.terstenMutlakDegereGoreHarfNotu();
        }
        if (this.sinif_ortalamasi > 70 && this.sinif_ortalamasi < 80) return this.terstenTGoreHarfNotu(34);
        if (this.sinif_ortalamasi > 62.5 && this.sinif_ortalamasi <= 70) return this.terstenTGoreHarfNotu(36);
        if (this.sinif_ortalamasi > 57.5 && this.sinif_ortalamasi <= 62.5) return this.terstenTGoreHarfNotu(38);
        if (this.sinif_ortalamasi > 52.5 && this.sinif_ortalamasi <= 57.5) return this.terstenTGoreHarfNotu(40);
        if (this.sinif_ortalamasi > 47.5 && this.sinif_ortalamasi <= 52.5) return this.terstenTGoreHarfNotu(42);
        if (this.sinif_ortalamasi > 42.5 && this.sinif_ortalamasi <= 47.5) return this.terstenTGoreHarfNotu(44);
        if (this.sinif_ortalamasi <= 42.5) return this.terstenTGoreHarfNotu(46);
      }
    }

    document.getElementById('hesaplaBtn').addEventListener('click', () => {
      const so = parseFloat(document.getElementById('sinifOrt').value);
      const ss = parseFloat(document.getElementById('stdSapma').value);
      const vn = parseFloat(document.getElementById('vizeNotu').value);
      const fn = parseFloat(document.getElementById('finalNotu').value);
      const hesap = new harfliNotHesaplama(so, ss, vn, fn);
      
      // Harf notunu hesapla
      hesap.harfNotuBul();
      
      // Tersinden hesapla (minimum final notları)
      const liste = hesap.terstenHesaplaFinalBut();
      
      // Sonuçları göster
      const out = document.getElementById('output');
      out.style.display = 'block';
      out.innerHTML = `<p>Harf Notu: <strong> ${hesap.harfNotu} </strong> </p>`;
      
      const toggleBtn1      = document.getElementById('toggleOutputs');
    if(toggleBtn1.textContent.trim() === 'dg'){
       toggleBtn1.textContent = "Detayları Gizle";
       toggleBtn1.style.display = 'block';
    }
const revOut = document.getElementById('reverseOutput');
revOut.innerHTML = '<strong>Gerekli Minimum Final/Büt Notu:</strong>';
const tersListe = liste.slice().reverse();
tersListe.forEach(item => {
  if (item.minFinal >= 45) {
    if(item.minFinal < 100)
     revOut.innerHTML += `<p><strong>${item.harf}</strong> : ${item.minFinal}</p>`;
    else
     revOut.innerHTML += `<p><strong>${item.harf}</strong> : ${item.minFinal} [İMKANSIZ]</p>`;
  }
});

      const detayCikti = document.getElementById('detaylar');
      detayCikti.innerHTML = `<p> Sınıf ortalaması: ${hesap.sinif_ortalamasi}</p>
      <p> Standart Sapma: ${hesap.standart_sapma}</p>
      <p> T Degeri: ${hesap.t_degeri}</p>
       <p> Öğrenci ortalaması: ${(hesap.vize_notu + hesap.final_notu)/2}</p>
      `;

     if(toggleBtn1.textContent.trim() === 'Detayları Gizle'){
       revOut.style.display = 'block';
       detayCikti.style.display = 'block';
       }

    });


//VARSAYILAN DEGERLER TABLOSU [PARCA2]
const defaultsBtn   = document.getElementById('defaultsBtn');
const defaultsPanel = document.getElementById('defaultsPanel');
const sinifInput    = document.getElementById('sinifOrt');
const stdInput      = document.getElementById('stdSapma');

// 2. Paneli toggle et
defaultsBtn.addEventListener('click', () => {
  defaultsPanel.style.display = defaultsPanel.style.display === 'block' ? 'none' : 'block';
});

// 3. Tablo satırlarına tıklama ekle
defaultsPanel.querySelectorAll('tbody tr').forEach(row => {
  row.addEventListener('click', () => {
    // data-* attribute’lardan değerleri al
    const sinif = row.getAttribute('data-sinif').replace(',', '.');
    const std   = row.getAttribute('data-std').replace(',', '.');

    // input’lara ata
    sinifInput.value = sinif;
    stdInput.value   = std;

    // paneli kapat
    defaultsPanel.style.display = 'none';
  });
});

// 4. Panel dışına tıklandığında kapatmak isterseniz (isteğe bağlı)
document.addEventListener('click', e => {
  if (defaultsPanel.style.display === 'block'
      && !defaultsPanel.contains(e.target)
      && e.target !== defaultsBtn) {
    defaultsPanel.style.display = 'none';
  }
});


//DETAYLARI GİZLEYİP GÖSTERME FONKSİYONU [PARCA3]
const toggleBtn      = document.getElementById('toggleOutputs');
const detaylarDiv      = document.getElementById('detaylar');
const reverseDiv     = document.getElementById('reverseOutput');

toggleBtn.addEventListener('click', () => {
  const isVisible = detaylarDiv.style.display !== 'none';

  detaylarDiv.style.display      = isVisible ? 'none' : 'block';
  reverseDiv.style.display     = isVisible ? 'none' : 'block';

  toggleBtn.textContent = isVisible
    ? 'Detayları Göster'
    : 'Detayları Gizle';
});