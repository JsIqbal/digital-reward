import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { AlertDestructive } from "@/components/invalid-num-alert";

const InvalidShet = ({ closeSheet, isSheetOpen, invalid }) => {
    return (
        <Sheet onOpenChange={closeSheet} open={isSheetOpen}>
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>List of Invalid Numbers:</SheetTitle>
                    <SheetDescription>
                        <AlertDestructive invalid={invalid} />
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};

export default InvalidShet;
