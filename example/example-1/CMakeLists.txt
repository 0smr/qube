cmake_minimum_required(VERSION 3.26)

project(example-1)

set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)
set(CMAKE_AUTOUIC ON)
set(CMAKE_AUTOGEN_PARALLEL AUTO)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(CMAKE_INCLUDE_CURRENT_DIR ON)

find_package(Qt6 6.5 REQUIRED COMPONENTS Quick)

qt_standard_project_setup(REQUIRES 6.5)

qt_add_executable(example-1
    main.cpp
)

if(CMAKE_BUILD_TYPE STREQUAL "Debug")
    set(NoCache NO_CACHEGEN)
endif()

qt_add_qml_module(${PROJECT_NAME}
    URI example
    ${NoCache}
    QML_FILES
        Main.qml
        Root.qml
)

add_subdirectory(${CMAKE_CURRENT_SOURCE_DIR}/../../qube/ ${CMAKE_CURRENT_BINARY_DIR}/qube)
target_link_libraries(example-1 PRIVATE qubeplugin)

target_link_libraries(example-1 PRIVATE Qt::Core Qt::Quick)
