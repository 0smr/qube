// Copyright (C) 2024 smr.
// SPDX-License-Identifier: MIT
// https://0smr.github.io

import QtQuick
import QtQuick.Templates as T

T.CheckBox {
    id: control

    implicitWidth: Math.max(implicitContentWidth + implicitBackgroundWidth + padding, implicitContentWidth)
    implicitHeight: Math.max(implicitBackgroundHeight, implicitIndicatorHeight)

    padding: 6
    spacing: 6

    indicator: ShaderEffect {
        id: shader
        implicitWidth: 30
        implicitHeight: 30

        x: control.text ? (control.mirrored ? control.width - width : control.padding) : 0

        property real u_time: 0
        property real u_value: control.checkState
        property color u_off: control.palette.button
        property color u_on: u_off

        fragmentShader: "qrc:/qube/shaders/checkbox.frag.qsb"

        Behavior on u_value { NumberAnimation { duration: 500 } }
    }

    background: null

    contentItem: Text {
        leftPadding: control.indicator && !control.mirrored ? control.implicitIndicatorWidth + control.spacing : 0
        rightPadding: control.indicator && control.mirrored ? control.implicitIndicatorWidth + control.spacing : 0

        verticalAlignment: Text.AlignVCenter
        text: control.text
        font: control.font
        color: control.palette.buttonText
    }
}
