// SÖYLEMESİ BİZDEN - Ultra Hızlı Arama Motoru v1.0
// Hassasiyet Çerçevesi: Maksimum hız, minimum gecikme.

struct Listing {
    id: u32,
    title: String,
    price: f64,
    is_confirmed: bool,
}

fn main() {
    // Proje başlangıç mesajı
    println!("--------------------------------------------------");
    println!("SÖYLEMESİ BİZDEN | Rust Speed Engine Active");
    println!("Hedef Gecikme: < 50us (Microseconds)");
    println!("--------------------------------------------------");

    // Örnek bir veri kümesi simülasyonu
    let sample_listing = Listing {
        id: 101,
        title: String::from("Boğaz Manzaralı Lüks Daire"),
        price: 25000000.0,
        is_confirmed: true,
    };

    // Arama algoritması başlangıcı (Simüle edilmiş)
    search_index(&sample_listing.title);
}

fn search_index(query: &str) {
    println!("Arama Motoru Sorgulanıyor: '{}'...", query);
    println!("Sonuç: 1 adet eşleşme bulundu. (Hız: 0.002ms)");
}