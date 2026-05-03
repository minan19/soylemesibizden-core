package services

import "math"

// CalculateTrustScore: SÖYLEMESİ BİZDEN Hassasiyet Çerçevesi Algoritması
func CalculateTrustScore(identity, authority, document, geo, media, price, freshness float64) float64 {
    score := (0.20 * identity) + 
             (0.15 * authority) + 
             (0.15 * document) + 
             (0.10 * geo) + 
             (0.10 * media) + 
             (0.10 * price) + 
             (0.10 * freshness)
    
    return math.Round(score*100) / 100
}
