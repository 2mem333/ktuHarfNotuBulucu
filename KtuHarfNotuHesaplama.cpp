#include <iostream>
#include "string"

class harfliNotHesaplama
{
private:
	double sinif_ortalamasi = 0;
	double standart_sapma = 0;
	double vize_notu = 0;
	double final_notu = 0;
	double t_degeri = 0;

	std::string harfNotu = "NOT INIT";
	double harfNotDegeri = 0;

	std::string harfNotuCevir(const double &katsayi)
	{
		if (katsayi == 0.0) return "FF";
		else if (katsayi == 0.5) return "FD";
		else if (katsayi == 1.0) return "DD";
		else if (katsayi == 1.5) return "DC";
		else if (katsayi == 2.0) return "CC";
		else if (katsayi == 2.5) return "CB";
		else if (katsayi == 3.0) return "BB";
		else if (katsayi == 3.5) return "BA";
		else if (katsayi == 4.0) return "AA";
		else return "ERROR katsayi (" + std::to_string(katsayi) + ")";
	}
	void tDegeriHesapla()
	{
		double ogrenci_ortalama = (vize_notu+ final_notu)/2;
		t_degeri = (ogrenci_ortalama - sinif_ortalamasi) / standart_sapma * 10 + 50;
		t_degeri = static_cast<int>(t_degeri * 100) / 100.0; //normalize edilir. virgulden sonra 2 basamak olacak.
	}
	double tDegeriIleHarfNotu(double sinir)
	{
		double notdegeri = 0;
		if (t_degeri < sinir)
		{
			return notdegeri;
		}
		else
		{
			for (int i = 1; i <= 8; i++)
			{
				notdegeri = notdegeri + 0.5;
				if (t_degeri >= sinir && t_degeri <= sinir + 5 - 0.01)
				{
					return notdegeri;
				}
				sinir = sinir + 5;
			}
		}
	}
	double mutlakSistemeGoreHarfNotu()
	{
		double ogrenci_ortalama = (vize_notu + final_notu) / 2;
		if (ogrenci_ortalama >= 90)
			return 4.0;
		if (ogrenci_ortalama >= 80)
			return 3.5;
		if (ogrenci_ortalama >= 75)
			return 3.0;
		if (ogrenci_ortalama >= 70)
			return 2.5;
		if (ogrenci_ortalama >= 60)
			return 2.0;
		if (ogrenci_ortalama >= 50)
			return 1.5;
		if (ogrenci_ortalama >= 40)
			return 1.0;
		if (ogrenci_ortalama >= 30)
			return 0.5;
		if (ogrenci_ortalama <= 29)
			return 0.0;
	}
	void terstenTGoreHarfNotu(double sinir)
	{
		double notdegeri = 1;
		for (int i = 1; i <= 6; i++)
		{
		notdegeri = notdegeri + 0.5; //DC'DEN BASLATILIR.
		//sanal t degeri minimum sinira esit olursa o not degerini aliriz.
		double minimum_alinmasi_gereken = 2 * ((sinir - 50) * standart_sapma / 10 + sinif_ortalamasi) - vize_notu;
		std::cout << harfNotuCevir(notdegeri) << " : " << minimum_alinmasi_gereken << "\n";
		sinir = sinir + 5;
		}
	}
	void terstenMutlakDegereGoreHarfNotu()
	{
		std::cout << "AA : " << 2 * 90 - vize_notu << "\n";
		std::cout << "BA : " << 2 * 80 - vize_notu << "\n";
		std::cout << "BB : " << 2 * 75 - vize_notu << "\n";
		std::cout << "CB : " << 2 * 70 - vize_notu << "\n";
		std::cout << "CC : " << 2 * 60 - vize_notu << "\n";
		std::cout << "DC : " << 2 * 50 - vize_notu << "\n";
	}
	void harfNotuBul()
	{
		tDegeriHesapla();

		double notdegeri;
		if (sinif_ortalamasi >= 80 && sinif_ortalamasi <= 100)
		{
			notdegeri = mutlakSistemeGoreHarfNotu();
		}
		if (sinif_ortalamasi > 70 && sinif_ortalamasi < 80)
		{
			notdegeri = tDegeriIleHarfNotu(24);
		}
		if (sinif_ortalamasi > 62.5 && sinif_ortalamasi <= 70)
		{
			notdegeri = tDegeriIleHarfNotu(26);
		}
		if (sinif_ortalamasi > 57.5 && sinif_ortalamasi <= 62.5)
		{
			notdegeri = tDegeriIleHarfNotu(28);
		}
		if (sinif_ortalamasi > 52.5 && sinif_ortalamasi <= 57.5)
		{
			notdegeri = tDegeriIleHarfNotu(30);
		}
		if (sinif_ortalamasi > 47.5 && sinif_ortalamasi <= 52.5)
		{
			notdegeri = tDegeriIleHarfNotu(32);
		}
		if (sinif_ortalamasi > 42.5 && sinif_ortalamasi <= 47.5)
		{
			notdegeri = tDegeriIleHarfNotu(34);
		}
		if (sinif_ortalamasi <= 42.5)
		{
			notdegeri = tDegeriIleHarfNotu(36);
		}
		harfNotDegeri = notdegeri;
		harfNotu = harfNotuCevir(notdegeri);
	}
public:
	//SINIF ORTALAMASI, STANDART SAPMA, VIZE NOTU, FINAL NOTU
	harfliNotHesaplama(const double& so, const double& ss, const double& vn, const double& fn) : sinif_ortalamasi(so),
		standart_sapma(ss), vize_notu(vn), final_notu(fn) {
	}

	void harfNotunuGor()
	{
		harfNotuBul();
		std::cout << "Harf Notu: " << harfNotu << "\n";
	}
	void terstenHesaplaFinalBut()
	{
		if (sinif_ortalamasi >= 80 && sinif_ortalamasi <= 100)
		{
			terstenMutlakDegereGoreHarfNotu();
		}
		if (sinif_ortalamasi > 70 && sinif_ortalamasi < 80)
		{
			terstenTGoreHarfNotu(34);
		}
		if (sinif_ortalamasi > 62.5 && sinif_ortalamasi <= 70)
		{
			terstenTGoreHarfNotu(36);
		}
		if (sinif_ortalamasi > 57.5 && sinif_ortalamasi <= 62.5)
		{
			terstenTGoreHarfNotu(38);
		}
		if (sinif_ortalamasi > 52.5 && sinif_ortalamasi <= 57.5)
		{
			terstenTGoreHarfNotu(40);
		}
		if (sinif_ortalamasi > 47.5 && sinif_ortalamasi <= 52.5)
		{
			terstenTGoreHarfNotu(42);
		}
		if (sinif_ortalamasi > 42.5 && sinif_ortalamasi <= 47.5)
		{
			terstenTGoreHarfNotu(44);
		}
		if (sinif_ortalamasi <= 42.5)
		{
			terstenTGoreHarfNotu(46);
		}
	}

};

int main()
{
	harfliNotHesaplama h1(75.37, 14.52,86,50); 

	h1.harfNotunuGor();
	h1.terstenHesaplaFinalBut();
}

