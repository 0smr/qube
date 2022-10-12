# QML Qube
<p><img src="https://img.shields.io/github/v/tag/smr76/qube?sort=semver&label=version&labelColor=0bd&color=07b" alt="version tag">
<img src="https://img.shields.io/github/license/smr76/qube?color=36b245" alt="license">
<a href="https://www.blockchain.com/bch/address/bitcoincash:qrnwtxsk79kv6mt2hv8zdxy3phkqpkmcxgjzqktwa3">
<img src="https://img.shields.io/badge/BCH-Donate-f0992e?logo=BitcoinCash&logoColor=f0992e" alt="BCH donate"></a></p>

**Qube** QtQuick2/QML theme.

*If you liked these components, please consider givin a star :star2:.*

<!-- ## Preview -->
<!-- <div align="center">&nbsp;
<img src="https://img.shields.io/badge/light-blue-49aaff">
<img src="https://img.shields.io/badge/dark-green-08d7a1"><br>
<img src="extra/preview/preview-1.webp" width="45%">
<img src="extra/preview/preview-2.webp" width="45%">
</div> -->

## How to use
> **Warning**<br>
> This components hava only been tested on **Qt version 5.15.2** and *Windows OS* at *3840x2160 resolution* with a *scaling factor of 250 percent*; ***USAGE OF THIS COMPONENTS CARRIES NO WARRANTY***.
> <br>&nbsp;

### Usage

Clone the repository first.
```bash
git clone "https://github.com/SMR76/qube.git"
```
Then include `Qube.pri` in your project. <sub>[see example-1](example/example-1/example-1.pro#L11)</sub>
```make
include("path/to/Qube.pri")
```
Add `qrc:/` to the engine import path. <sub>[see example-1](example/example-1/main.cpp#L17)</sub>
```cpp
engine.addImportPath("qrc:/");
```
And finally import the `Qube` module. <sub>[see example-1](example/example-1/main.qml#L6)</sub>
```qml
import Qube 1.0
```

If you are confused, please refer to [example-1](example/example-1/) for a clearer understanding of what you should do.

## Components

<details open>
<summary>Pending</summary>

- [ ] Button
- [ ] Radio Button
- [ ] CheckBox
- [ ] Slider
- [ ] ProgressBar
- [ ] RadioButton
- [ ] Switch
- [ ] RangeSlider
- [ ] SpinBox
- [ ] Tumbler
- [ ] Dial
- [ ] BusyIndicator
- [ ] TextArea
- [ ] TextField
- [ ] ComboBox

</details>

## Issues

Please file an issue on [issues page](https://github.com/SMR76/qube/issues) if you have any problems.

## Documentation

[Documentation](docs/README.md) can be found in the `docs` directory.