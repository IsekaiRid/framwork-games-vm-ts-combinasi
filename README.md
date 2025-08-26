# Frirmoc Framework

**Frirmoc** adalah framework sederhana untuk membuat game visual novel menggunakan TypeScript dan bahasa scripting sendiri bernama **Moci**. Framework ini memudahkan pembuatan screens, variabel, fungsi, dan opsi interaktif dengan dukungan AI untuk pengembangan konten.

---

## Struktur Folder

```
D:\TS-VN-FRAMWORK\
├─ icon.png             # Icon project
├─ src\
│  ├─ main.ts           # Entry point
│  ├─ frirmoc.ts        # Core framework engine
│  └─ screens.ts        # Definisi semua screens
├─ assets\
│  ├─ school_hall.png
│  ├─ hero.png
│  ├─ pantai.png
│  └─ lapangan.png
├─ package.json
```

---

## Contoh Script Moci

### Variabel dan Fungsi

```moci
#varibel = ''        ~ variabel string default ''

fuc poin() => {      ~ fungsi poin
    varibel+         ~ increment varibel
}
```

### Screen / Scene

```moci
moc screen.1() => {
    bg "school_hall.png" x.3 y.1
    spaw "hero.png" x.200 y.300 animation.up

    ops [
        'Apa kamu yakin' => 'iya'[jump=>screen.2], 'tidak'[fuc=>poin]
    ]

    ops [
        'Apa kamu yakin mau lanjut' => 'iya'[continue], 'tidak'[jump=>screen.2]
    ]
}

moc screen.2() => { bg "pantai.png" }
moc screen.3() => { bg "lapangan.png" }
```

### JSON Bytecode Output

```json
{
  "variables": {
    "varibel": {"type": "string", "default": "'        ~ variabel string default '"}
  },
  "funcs": {
    "poin": {"name": "poin", "body": [{"op": "increment", "var": "varibel"}]}
  },
  "screens": {
    "screen.1": {
      "id": "screen.1",
      "bg": "school_hall.png",
      "spawns": [{"url": "hero.png", "x": 200, "y": 300, "animation": "up"}],
      "options": []
    },
    "screen.2": {"id": "screen.2", "bg": "pantai.png", "spawns": [], "options": []},
    "screen.3": {"id": "screen.3", "bg": "lapangan.png", "spawns": [], "options": []}
  }
}
```

---

## Mekanisme Framework

1. **Moci → Parser**: Script `.moci` dibaca engine dan diubah menjadi JSON bytecode.
2. **Engine TypeScript**: JSON digunakan untuk menampilkan screen, karakter, background, dan opsi interaktif.
3. **AI Assistant**: Membantu mengembangkan konten cerita dan logika interaktif.
4. **Custom Language (Moci)**: Mempermudah penulisan fungsi, variabel, screen, dan opsi tanpa perlu kode TypeScript yang kompleks.

---

## Contoh Integrasi Screen dengan Engine

```ts
import { Engine } from './frirmoc';
import screens from './screens';

const engine = new Engine(screens);
engine.start('screen.1');
```

---

## Lisensi & Kredit

* Framework ini dikembangkan menggunakan TypeScript.
* Beberapa bagian pengembangan dibantu AI (GPT).
* Bahasa scripting **Moci** dibuat sendiri untuk memudahkan desain game interaktif.
* Icon project berada di `D:\TS-VN-FRAMWORK\icon.png`.

---

## Catatan

* Framework ini masih sederhana dan modular.
* Nanti bisa dikembangkan lebih lanjut untuk mendukung animasi, efek suara, dan branching lebih kompleks.
* Bytecode JSON bisa digunakan untuk editor visual atau engine lain yang mendukung struktur yang sama.
