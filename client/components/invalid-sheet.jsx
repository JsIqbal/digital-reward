import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { AlertDestructive } from "@/components/invalid-num-alert";

const InvalidShet = ({ closeSheet, isSheetOpen, invalid, duplicate }) => {
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
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};

export default InvalidShet;
