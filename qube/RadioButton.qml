// Copyright (C) 2024 smr.
// SPDX-License-Identifier: MIT
// https://0smr.github.io

import QtQuick
import QtQuick.Templates as T

T.RadioButton {
    id: control

    implicitWidth: Math.max(implicitBackgroundWidth + leftInset + rightInset,
                            implicitContentWidth + leftPadding + rightPadding)
    implicitHeight: Math.max(implicitBackgroundHeight + topInset + bottomInset,
                            implicitContentHeight + topPadding + bottomPadding,
                            implicitIndicatorHeight + topPadding + bottomPadding)

    padding: 6
    spacing: 6

    indicator: ShaderEffect {
        id: shader
        implicitWidth: 30
        implicitHeight: 30

        y: control.padding
        x: control.text ? (control.mirrored ? control.width - width : control.padding) : 0

        property real u_time: 0
        property real u_value: control.checked
        property color u_off: control.palette.button
        property color u_on: u_off

        fragmentShader: "qrc:/qube/shaders/radio.frag.qsb"

        Behavior on u_value { NumberAnimation {} }
    }

    background: null

    contentItem: Text {
        leftPadding: control.indicator && !control.mirrored ? control.indicator.width + control.spacing : 0
        rightPadding: control.indicator && control.mirrored ? control.implicitIndicatorWidth + control.spacing : 0

        verticalAlignment: Text.AlignVCenter
        color: control.palette.buttonText
        text: control.text
        font: control.font
    }
}
