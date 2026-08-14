const ExcelJS = require('exceljs')


async function excelDemo() {

    const Workbook = new ExcelJS.Workbook()
    await Workbook.xlsx.readFile("C:\\Work\\Playwright\\PlaywriteRestart\\excelUtils\\download.xlsx")

    const worksheet = Workbook.getWorksheet('Sheet1')
    worksheet.eachRow((row, rowNumber) => {

        row.eachCell((cell, cellNumber) => {
            console.log(cell.value)
        })
    })

}

async function findRowColumnOfAData(datatoFind) {
    const Workbook = new ExcelJS.Workbook();
    await Workbook.xlsx.readFile("C:\\Work\\Playwright\\PlaywriteRestart\\excelUtils\\download.xlsx")
    const workSheet = Workbook.getWorksheet("Sheet1")
    workSheet.eachRow((row, rowNumber) => {

        row.eachCell((cell, cellNumber) => {
            if (cell.value === datatoFind) {
                console.log(rowNumber)
                console.log(cellNumber)
            }
        })
    })
}

async function EditExcelCellToaNewValue(oldData, newData, filePath) {
    const Workbook = new ExcelJS.Workbook()
    await Workbook.xlsx.readFile(filePath)
    const workSheet = Workbook.getWorksheet("Sheet1")
    const ExcelData = await SearchAndGetRowColumn(workSheet, oldData)
    const updatedCell = workSheet.getCell(ExcelData.rowValue, ExcelData.columnValue)
    updatedCell.value = newData
    await Workbook.xlsx.writeFile(filePath)

}

async function SearchAndGetRowColumn(worksheet, dataToSearch) {
    const excelRowColumn = { rowValue: -1, columnValue: -1 }
    worksheet.eachRow((row, rowNumber) => {

        row.eachCell((cell, cellNumber) => {
            if (cell.value === dataToSearch) {
                excelRowColumn.rowValue = rowNumber
                excelRowColumn.columnValue = cellNumber
            }
        })
    })
    return excelRowColumn;
}

export async function UpdateValueOfACellOnADifferentColumn(oldData, newData,cordinateForChange,filePath) {
    const Workbook = new ExcelJS.Workbook()
    await Workbook.xlsx.readFile(filePath)
    const workSheet = Workbook.getWorksheet("Sheet1")
    const ExcelData = await SearchAndGetRowColumn(workSheet, oldData)
    const updatedCell = workSheet.getCell(ExcelData.rowValue, ExcelData.columnValue+cordinateForChange.column)
    updatedCell.value = newData
    await Workbook.xlsx.writeFile(filePath)
}


// UpdateValueOfACellOnADifferentColumn("Apple", 390,{row:0,column:2} ,"C:\\Work\\Playwright\\PlaywriteRestart\\excelUtils\\download.xlsx")
