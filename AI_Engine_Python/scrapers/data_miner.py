import time
import random

class DataMiner:
    def __init__(self):
        self.targets = ["Sahibinden", "Emlakjet", "Hepsiemlak"]
        
    def fetch_market_data(self, region):
        print(f"\n[SÖYLEMESİ BİZDEN] Madencilik Başlatıldı: {region}")
        for target in self.targets:
            print(f"--> {target} verileri taranıyor...")
            time.sleep(0.5)
        
        # Simüle edilmiş piyasa verisi
        mock_data = {
            "region": region,
            "avg_price_m2": random.randint(85000, 120000),
            "listings_found": random.randint(100, 500),
            "status": "Success"
        }
        print(f"OK. {region} için {mock_data['listings_found']} ilan analiz edildi.")
        return mock_data

if __name__ == "__main__":
    miner = DataMiner()
    miner.fetch_market_data("İstanbul/Bebek")
