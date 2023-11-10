Feature: 02 - Crowdar Academy 2023 - Mi Cuenta

    Background:
        Given El cliente se encuentra en el login
        When El cliente ingresa a su cuenta
        
    @MiCuenta
    Scenario: El cliente ingresa a su Dashboard
    Then El cliente ve su Dashborad

    @MiCuenta
    Scenario: El cliente ingresa a ver sus Ordenes
    Then El cliente ve sus Ordenes

    @MiCuenta
    Scenario: El cliente sale de su cuenta
    Then El cliente esta fuera de su cuenta