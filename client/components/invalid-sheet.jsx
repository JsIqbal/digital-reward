// import {
//     Sheet,
//     SheetContent,
//     SheetDescription,
//     SheetHeader,
//     SheetTitle,
// } from "@/components/ui/sheet";
// import { AlertDestructive } from "@/components/invalid-num-alert";

// const InvalidShet = ({ closeSheet, isSheetOpen, invalid, duplicate }) => {
//     console.log("---------------------invalid sheet invalids", invalid);
//     console.log("---------------------invalid sheet duplicate", duplicate);
//     return (
//         <Sheet onOpenChange={closeSheet} open={isSheetOpen}>
//             <SheetContent className="overflow-auto" side="right">
//                 <SheetHeader>
//                     <SheetTitle>List of Invalid/Duplicate Numbers:</SheetTitle>
//                     <SheetDescription>
//                         <AlertDestructive
//                             invalid={invalid}
//                             duplicate={duplicate}
//                         />
//                     </SheetDescription>
//                 </SheetHeader>
//             </SheetContent>
//         </Sheet>
//     );
// };

// export default InvalidShet;

import React, { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { AlertDestructive } from "@/components/invalid-num-alert";
import { Button } from "./ui/button";

const InvalidSheet = ({ closeSheet, isSheetOpen, invalid, duplicate }) => {
    const [csvData, setCsvData] = useState("");

    const handleDownload = () => {
        // Convert the invalid numbers array to CSV format
        const csvContent = "data:text/csv;charset=utf-8," + invalid.join("\n");
        setCsvData(csvContent);

        // Trigger the download
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "invalid_numbers.csv");
        document.body.appendChild(link);
        link.click();
    };

    return (
        <Sheet onOpenChange={closeSheet} open={isSheetOpen}>
            <SheetContent className="overflow-auto" side="right">
                <SheetHeader>
                    <SheetTitle>List of Invalid/Duplicate Numbers:</SheetTitle>
                    <SheetDescription>
                        <AlertDestructive
                            invalid={invalid}
                            duplicate={duplicate}
                        />
                        <Button onClick={handleDownload}>
                            Download Invalid Numbers
                        </Button>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};

export default InvalidSheet;
