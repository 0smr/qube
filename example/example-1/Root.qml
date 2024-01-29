import QtCore
import QtQuick
import QtQuick.Controls.Basic

import qube

Page {
    id: root

    width: 260
    height: 420
    visible: true

    palette {
        button: "#4af"
        buttonText: "#fff"
        highlight: "#57f"
        highlightedText: "#fff"

        base: "#1d1c21"
        text: "#eee"
        window: '#1d1c21'
        windowText: "#eee"
        placeholderText: '#eee'
    }

    component ButtonColor: Button {
        width: 20; height: width; text: '\u2022'
        onClicked: {
            root.palette.button = palette.button
            root.palette.buttonText = palette.buttonText
            root.palette.highlight = palette.button
            root.palette.highlightedText = palette.buttonText
        }
    }

    component BackColor: Button {
        width: 20; height: width; text: '\u2022'
        onClicked: {
            root.palette.base = palette.button
            root.palette.text = palette.buttonText
            root.palette.window = palette.button
            root.palette.windowText = palette.buttonText
            root.palette.placeholderText = palette.buttonText
        }
    }

    component Title: Label {
        color: palette.windowText
        font.bold: true
        opacity: 0.3
    }

    component HLine: Rectangle {
        color: palette.windowText
        width: parent && parent.width
        opacity: 0.3
    }

    Control {
        x: 5; y: root.height - height - 5; z: 3
        padding: 5
        background: Rectangle { color: palette.windowText; opacity: 0.2; radius: 3 }
        contentItem: Row {
            spacing: 4
            ButtonColor { palette { button:'#48abff';buttonText:'#1d1c21' }}
            ButtonColor { palette { button:'#edc9aa';buttonText:'#1d1c21' }}
            ButtonColor { palette { button:'#4ce0b3';buttonText:'#1d1c21' }}
            ButtonColor { palette { button:'#1d1c21';buttonText:'#f5f6f7' }}
            Item { width: 4; height: parent.height }
            BackColor { palette { button: '#f5f6f7'; buttonText:'#1d1c21' }}
            BackColor { palette { button: '#1d1c21'; buttonText:'#f5f6f7' }}
        }
    }

    Settings {
        id: settings
        location: 'config.conf'
        property alias cindex: swipview.currentIndex
    }

    PageIndicator {
        x: parent.width - width - 25
        y: parent.height - height - 5
        count: swipview.count
        currentIndex: swipview.currentIndex

        palette.dark: '#fff'
    }

    SwipeView {
        id: swipview
        padding: 5
        spacing: padding
        anchors.fill: parent

        Grid {
            columns: 1; rows: -1; spacing: 5

            RadioButton { text: 'CheckBox' }
            RadioButton { text: 'CheckBox' }
            CheckBox {
                text: 'CheckBox'
                tristate: true
            }
            Switch {
                text: 'CheckBox'
            }

            Title { text: 'MultiRangeSlider' }
        }

        Grid {
            columns: 1; rows: -1; spacing: 5
            Title { text: 'MultiRangeSlider' }
        }
    }
}
