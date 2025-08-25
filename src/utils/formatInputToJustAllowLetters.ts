

interface FormatInputToJustAllowLettersProps {
    inputName: "name" | "email" | "password" | "availableHours" | "role"
    inputValue: string
    setValue: (inputName: string, valorInput: string) => void
}

function formatInputToJustAllowLetters({inputName, inputValue, setValue}: FormatInputToJustAllowLettersProps) {

    return setValue(inputName, inputValue.replace(/[^a-zA-ZÀ-ÿ\s]/g, ""))
    // permite letras, acentos e espaços
}