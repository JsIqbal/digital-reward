import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export const ApprovalCard = () => {
    return (
        <Card className="lg:w-6/12 mr-auto ml-auto mt-10">
            <CardHeader>
                <CardTitle>KYC form submitted</CardTitle>
                <CardDescription>
                    waiting for <span className="font-bold">approval</span>.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>
                    Please talk to your administrator and{" "}
                    <span className="font-bold">Activate</span> your account to
                    access all the features of the{" "}
                    <span className="font-bold">portal</span>.
                </p>
            </CardContent>
        </Card>
    );
};
