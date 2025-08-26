import * as XLSX from "xlsx";

export const functionExportExcel = async (input: any, name: string) => {
    if (!input) {
        return null
    }
    const worksheet = XLSX.utils.json_to_sheet(input);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, `${name}.xlsx`);
};