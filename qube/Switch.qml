// Copyright (C) 2024 smr.
// SPDX-License-Identifier: MIT
// https://0smr.github.io


import QtQuick
import QtQuick.Templates as T

T.Switch {
    id: control

    implicitWidth: Math.max(implicitBackgroundWidth + leftInset + rightInset,
                            implicitContentWidth + leftPadding + rightPadding)
    implicitHeight: Math.max(implicitBackgroundHeight + topInset + bottomInset,
                             implicitContentHeight + topPadding + bottomPadding,
                             implicitIndicatorHeight + topPadding + bottomPadding)

    padding: 6
    spacing: 0

    indicator: ShaderEffect {
        implicitWidth: 2 * implicitHeight
        implicitHeight: 30

        y: (control.height - height) / 2;
        x: control.text ? (control.mirrored ? control.width - width : 0) :
                          (control.availableWidth - width) / 2

        property real u_value: control.visualPosition
        property color u_off: control.palette.button
        property color u_on: u_off

        fragmentShader: "qrc:/qube/shaders/switch.frag.qsb"

        Behavior on u_value { SmoothedAnimation { velocity: 2 } }
    }

    background: null

    contentItem: Text {
        leftPadding: control.indicator && !control.mirrored ? control.indicator.width + control.spacing : 0
        rightPadding: control.indicator &&  control.mirrored ? control.indicator.width + control.spacing : 0
        verticalAlignment: Text.AlignVCenter
        text: control.text
        font: control.font
        color: control.palette.buttonText
    }
}
