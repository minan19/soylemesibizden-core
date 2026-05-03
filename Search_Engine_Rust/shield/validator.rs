struct Listing {
    id: String,
    price: u64,
    m2: u32,
    trust_score: f32,
}

impl Listing {
    // SÖYLEMESİ BİZDEN | Otonom Doğrulama Mantığı
    fn validate(&self) -> bool {
        let unit_price = self.price / self.m2 as u64;
        
        // Örnek: Birim fiyat 50.000 TL altıysa lüks segment dışıdır, reddet.
        if unit_price < 50000 {
            println!("[SHIELD] REDDEDİLDİ: Düşük Birim Fiyat (ID: {})", self.id);
            return false;
        }

        // Trust Score %70 altındaysa doğrulanmamış kabul et.
        if self.trust_score < 70.0 {
            println!("[SHIELD] REDDEDİLDİ: Düşük Güven Skoru (ID: {})", self.id);
            return false;
        }

        println!("[SHIELD] ONAYLANDI: Veri Hassasiyeti Tam (ID: {})", self.id);
        true
    }
}

fn main() {
    let sample_listing = Listing {
        id: String::from("SB-999"),
        price: 25000000,
        m2: 200,
        trust_score: 95.0,
    };

    sample_listing.validate();
}
