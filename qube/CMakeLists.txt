cmake_minimum_required(VERSION 3.23.0)
project(qube VERSION 0.2.0)

set(QML_IMPORT_PATH "${CMAKE_CURRENT_SOURCE_DIR}/.." CACHE STRING "QML Import Path for QtCreator")
set(QML2_IMPORT_PATH "${CMAKE_CURRENT_SOURCE_DIR}/.." CACHE STRING "QML2 Import Path for QtCreator")

set(CMAKE_INCLUDE_CURRENT_DIR ON)

find_package(Qt6 6.5 REQUIRED COMPONENTS Core Quick Qml ShaderTools)

add_library(qube STATIC)

target_link_libraries(qube PRIVATE Qt::Core Qt::Quick Qt::Qml)

# QTP0001: The new behavior ensures that modules are put into the QML Import Path
#   and can be found without further setup.
qt_policy(SET QTP0001 NEW)

set_source_files_properties(${CMAKE_CURRENT_SOURCE_DIR}/Qube.qml PROPERTIES
    QT_QML_SINGLETON_TYPE TRUE
)

set_source_files_properties(${CMAKE_CURRENT_SOURCE_DIR}/scripts.js PROPERTIES
    QT_QML_SOURCE_TYPENAME Scripts
)

file(GLOB QML_FILES RELATIVE ${CMAKE_CURRENT_SOURCE_DIR} "*.qml" "*/*.qml")

if(CMAKE_BUILD_TYPE STREQUAL "Debug")
    set(NoCache NO_CACHEGEN)
endif()

qt_add_qml_module(qube
    URI qube
    VERSION 0.1
    ${NoCache}
    QML_FILES ${QML_FILES}
    QML_FILES scripts.js
)

# qt_add_resources(qube "fonts"
#     PREFIX /qube
#     FILES font/mplus1code.ttf
# )

qt6_add_shaders(qube "shaders"
    PREFIX /qube
    FILES
        shaders/button.frag
        shaders/checkbox.frag
        shaders/radio.frag
        shaders/switch.frag
)
