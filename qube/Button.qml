// Copyright (C) 2024 smr.
// SPDX-License-Identifier: MIT
// https://0smr.github.io

import QtQuick
import QtQuick.Templates as T
import QtQuick.Controls.Basic

T.Button {
    id: control

    implicitWidth: Math.max(implicitBackgroundWidth + leftInset + rightInset,
                                implicitContentWidth + leftPadding + rightPadding)
    implicitHeight: Math.max(implicitBackgroundHeight + topInset + bottomInset,
                                implicitContentHeight + topPadding + bottomPadding)

    padding: 6
    spacing: 6

    icon.width: 24
    icon.height: 24
    icon.color: control.palette.buttonText

    display: AbstractButton.TextOnly

    contentItem: Item {
        Grid {
            x: (parent.width - width)/2
            y: (parent.height - height)/2

            spacing: control.display == AbstractButton.TextOnly ||
                     control.display == AbstractButton.IconOnly ? 0 : control.spacing

            rows: control.display == AbstractButton.TextUnderIcon ? 1 : -1
            columns: -rows

            layoutDirection: control.mirrored ? Qt.RightToLeft : Qt.LeftToRight

            opacity: control.down || control.checked ? 0.8 : 1.0

            Image {
                visible: control.display != AbstractButton.TextOnly
                source: control.icon.source
                width: control.icon.width
                height: control.icon.height
                cache: control.icon.cache
            }

            Text {
                visible: control.display != AbstractButton.IconOnly
                text: control.text
                font: control.font
                color: control.palette.buttonText
                horizontalAlignment: Text.AlignHCenter
            }
        }
    }

    background: ShaderEffect {
        id: shader
        property real u_time: 0
        property real u_value: 0
        property color u_off: '#1c1c1c'
        property color u_on: '#1c1c1c'
        property point u_mouse: hh.point.position
        property var source: null
        fragmentShader: "qrc:/qube/shaders/button.frag.qsb"

        HoverHandler { id: hh }
    }
}
