import datetime

class SoylemesiBizdenAI:
    """
    Söylemesi Bizden - Rakipsiz Analiz Motoru
    İlanların doğruluğunu ve yatırım potansiyelini hesaplar.
    """
    def __init__(self):
        self.version = "1.0.0"

    def calculate_listing_score(self, price, area_m2, location_avg_m2):
        # m2 fiyatını hesapla
        current_m2_price = price / area_m2
        
        # Piyasa ortalamasından sapmayı bul
        deviation = (current_m2_price - location_avg_m2) / location_avg_m2
        
        # Güven skoru hesapla (Piyasadan çok sapan ilan şüphelidir)
        trust_score = 100 - (abs(deviation) * 100)
        
        return {
            "analysis_date": datetime.datetime.now().isoformat(),
            "trust_score": f"%{max(0, trust_score):.2f}",
            "is_reliable": trust_score > 70,
            "investment_advice": "Fırsat Ürünü" if deviation < -0.1 else "Piyasa Değerinde"
        }

if __name__ == "__main__":
    # Test: 5M TL, 100m2, Bölge ortalaması 45bin TL/m2
    engine = SoylemesiBizdenAI()
    print(engine.calculate_listing_score(5000000, 100, 45000))