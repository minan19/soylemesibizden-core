package main

import (
	"encoding/json"
	"net/http"
)

type Property struct {
	ID          int      `json:"id"`
	Title       string   `json:"title"`
	Price       string   `json:"price"`
	Region      string   `json:"region"`
	TrustScore  float64  `json:"trust_score"`
	InvestIQ    float64  `json:"invest_iq"`
	Description string   `json:"description"`
}

func main() {
	http.HandleFunc("/api/properties", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Content-Type", "application/json")

		properties := []Property{
			{1, "Bebek Signature Yalı", "145.000.000 TL", "İSTANBUL / BEBEK", 98.5, 92.1, "Mimar Sinan dokunuşlu, boğaza sıfır nadir bir varlık."},
			{2, "Yeniköy Tarihi Köşk", "210.000.000 TL", "İSTANBUL / YENİKÖY", 96.2, 88.4, "Geniş bahçeli, mahremiyeti en üst düzeyde tutan tarihi yapı."},
			{3, "Etiler Modern Penthouse", "65.000.000 TL", "İSTANBUL / ETİLER", 94.8, 85.7, "Modern mimari ile akıllı ev sistemlerinin elit buluşması."},
		}
		json.NewEncoder(w).Encode(properties)
	})
	http.ListenAndServe(":8080", nil)
}
