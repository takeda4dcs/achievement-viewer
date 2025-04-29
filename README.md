# このリポジトリについて

このリポジトリではAstar Networkおよび、Astar Shibuya Testnetにデプロイされている  
以下のスマートコントラクトと対話するためのフロントエンドを公開しています。

## 接続先スマートコントラクト

### メタデータ

IPFS Piece CID: [bafkzcibdyjjawwpzphktd2jhirvyzwsyonquqprrqeucoqmfhpzbvctmdhicadaf](https://bafybeicef2wbnqjyoat6saioogxt7foirpn4eqv7ojvslrzmozzkfpfivi.ipfs.w3s.link/metadata.json)

### Astar Network

スマートコントラクト アドレス: `YxCL8irL3gw8fd748jgm1nj6SUQiEHdwMbEgZuYrPARM2SY`

### Astar Shibuya Testnet （テスト環境）

スマートコントラクト アドレス: `a3iPvo7zDvCzyFpHVyqdTKyFNFRYLa7BMC82YQpw7cWEWa8`

## 始め方

### 環境変数の設定

Astar Networkに接続する場合

``` shell
NEXT_PUBLIC_CONTRACT_ADDRESS=YxCL8irL3gw8fd748jgm1nj6SUQiEHdwMbEgZuYrPARM2SY
NEXT_PUBLIC_URL=wss://rpc.astar.network
NEXT_PUBLIC_CHAIN=Astar
NEXT_PUBLIC_CHAIN_DISCRIPTION="日本発のパブリックブロックチェーン"
NEXT_PUBLIC_METADATA_URL="https://bafybeicef2wbnqjyoat6saioogxt7foirpn4eqv7ojvslrzmozzkfpfivi.ipfs.w3s.link/metadata.json"
```

Astar Shibuya Testnetに接続する場合

``` shell
NEXT_PUBLIC_CONTRACT_ADDRESS=a3iPvo7zDvCzyFpHVyqdTKyFNFRYLa7BMC82YQpw7cWEWa8
NEXT_PUBLIC_URL=wss://rpc.shibuya.astar.network
NEXT_PUBLIC_CHAIN=Shibuya
NEXT_PUBLIC_CHAIN_DISCRIPTION="Astar Netwarkのテストネット"
NEXT_PUBLIC_METADATA_URL="https://bafybeicef2wbnqjyoat6saioogxt7foirpn4eqv7ojvslrzmozzkfpfivi.ipfs.w3s.link/metadata.json"
```

その他、以下の環境変数を参照しています

- `NEXT_PUBLIC_SITE_TITLE`  # サイトタイトル
- `NEXT_PUBLIC_SITE_DESCRIPTION` # サイト詳細（メタデータ）

用途に応じて適宜設定して下さい。

### ローカル環境でテスト実行

以下のコマンドを実行すると、ローカル環境でサーバープロセスが立ち上がります。  
`localhost:3000`でアクセスできます。

``` shell
npm dev
```

### デプロイ

以下のコマンドを実行し `out/`ディレクトリに生成されるWebリソースを、WebサーバーないしCDNでホスティングして下さい。  
サーバーサイドでの処理はありませんので、静的サイトとしてホスティングすれば動作します。

``` shell
npm build
```

[DEMO](https://demo.achievements.work/)

## 推奨環境

リポジトリ管理している依存パッケージバージョン記録ファイルがpnpm前提となっていますので、  
JavaScriptパッケージマネージャにはpnpmを用いることを推奨します。
