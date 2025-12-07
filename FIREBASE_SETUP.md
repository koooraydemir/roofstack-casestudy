# Firebase Kurulum Rehberi

Bu proje Firebase Firestore kullanmaktadır. Aşağıdaki adımları izleyerek Firebase projenizi kurun.

## 1. Firebase Projesi Oluşturma

1. [Firebase Console](https://console.firebase.google.com/) adresine gidin
2. "Add project" / "Proje ekle" butonuna tıklayın
3. Proje adı girin (örn: restaurant-order-app)
4. Google Analytics'i istediğiniz gibi yapılandırın
5. Projeyi oluşturun

## 2. Web Uygulaması Ekleme

1. Firebase Console'da projenize gidin
2. Project Overview sayfasında "Web" (</>) ikonuna tıklayın
3. Uygulama adı girin
4. "Register app" butonuna tıklayın
5. Firebase config bilgilerinizi kopyalayın

## 3. Firestore Database Oluşturma

1. Sol menüden "Firestore Database" seçin
2. "Create database" butonuna tıklayın
3. **Test mode** seçin (geliştirme için)
4. Lokasyon seçin (örn: europe-west1)
5. "Enable" butonuna tıklayın

## 4. Environment Değişkenlerini Ayarlama

1. Proje kök dizininde `.env` dosyası oluşturun
2. `.env.example` dosyasındaki değişkenleri kopyalayın
3. Firebase Console'dan aldığınız değerlerle doldurun:

```env
NUXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NUXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NUXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

## 5. Firestore Koleksiyonları Oluşturma

### Products Koleksiyonu

Firestore Console'da `products` koleksiyonu oluşturun ve aşağıdaki yapıya göre belgeler ekleyin:

```javascript
{
  name: "Izgara Tavuk",
  description: "Özel soslu ızgara tavuk göğsü",
  price: 85.00,
  category: "ana_yemek",
  available: true,
  preparationTime: 20,
  image: "https://example.com/image.jpg",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Orders Koleksiyonu

`orders` koleksiyonu otomatik olarak oluşacaktır. Yapı:

```javascript
{
  tableNumber: 5,
  customerName: "Ahmet Yılmaz",
  items: [
    {
      productId: "product-id",
      productName: "Izgara Tavuk",
      quantity: 2,
      price: 85.00,
      notes: "Az pişmiş olsun"
    }
  ],
  totalAmount: 170.00,
  status: "beklemede",
  notes: "Acele sipariş",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## 6. Örnek Veri Ekleme

Proje içindeki `utils/seedData.ts` dosyasında hazır örnek ürünler bulunmaktadır.

Firebase Console üzerinden manuel olarak ekleyebilir veya bir seed script'i yazabilirsiniz.

## 7. Firestore Güvenlik Kuralları (Production için)

Test mode'dan production'a geçerken güvenlik kurallarını güncelleyin:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products - Herkes okuyabilir, sadece admin yazabilir
    match /products/{product} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }

    // Orders - Herkes okuyabilir ve yazabilir (şimdilik)
    match /orders/{order} {
      allow read, write: if true;
    }
  }
}
```

## 8. Kategoriler

Sistemde kullanılan kategori enum değerleri:

- `ana_yemek` - Ana Yemek
- `meze` - Meze
- `salata` - Salata
- `pizza` - Pizza
- `burger` - Burger
- `makarna` - Makarna
- `tatli` - Tatlı
- `icecek` - İçecek

## 9. Sipariş Durumları

- `beklemede` - Beklemede
- `hazirlaniyor` - Hazırlanıyor
- `hazir` - Hazır
- `teslim_edildi` - Teslim Edildi
- `iptal` - İptal

## API Kullanımı

### Ürünleri Getirme

```typescript
const { fetchProducts, products, loading } = useProducts()
await fetchProducts()
```

### Sipariş Oluşturma

```typescript
const { createOrder } = useOrders()
const orderId = await createOrder(
  items,
  'Müşteri Adı',
  5, // masa numarası
  'Notlar'
)
```

### Sipariş Durumu Güncelleme

```typescript
const { updateOrderStatus } = useOrders()
await updateOrderStatus(orderId, 'hazirlaniyor')
```

## Sorun Giderme

- `.env` dosyasının `.gitignore`'da olduğundan emin olun
- Firebase config değerlerinin doğru olduğunu kontrol edin
- Firestore Database'in oluşturulduğunu ve aktif olduğunu kontrol edin
- Browser console'da hata mesajlarını kontrol edin
