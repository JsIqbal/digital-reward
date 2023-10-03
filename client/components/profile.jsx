import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import useProfile from "@/hooks/user-profile";
import Loader from "./loader";
import { Separator } from "./ui/separator";

export const Profile = () => {
    const { profile, profileStatus } = useProfile();

    if (!profileStatus) {
        return <Loader height="100%" />;
    }

    return (
        <Dialog className="bg-white rounded-lg shadow-lg ">
            <DialogTrigger>Profile</DialogTrigger>
            <DialogContent className="p-4">
                <DialogHeader className="text-2xl font-bold text-gray-800">
                    <DialogTitle>
                        <span className=" text-gray-700 font-semibold">
                            PROFILE:
                        </span>
                        <span className="ml-2 text-gray-700">
                            {profile.User.username}
                        </span>

                        <Separator className="mt-4" />
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col md:flex-row">
                    <div className="mb-2 md:mr-4 text-lg ">
                        <span className=" text-gray-700 font-semibold">
                            Business Name:
                        </span>
                        <span className="ml-2 text-gray-700">
                            {profile.Profile.business_name}
                        </span>
                    </div>
                    <div className="text-lg  ml-auto">
                        <span className=" text-gray-700 font-semibold">
                            Business Lead:
                        </span>
                        <span className="ml-2 text-gray-700">
                            {profile.Profile.business_lead}
                        </span>
                    </div>
                </div>

                <div className="text-lg ">
                    <span className=" text-gray-700 font-semibold">Email:</span>
                    <span className="ml-2 text-gray-700">
                        {profile.Profile.email}
                    </span>
                </div>
                <div className="text-lg ">
                    <span className=" text-gray-700 font-semibold">NID:</span>
                    <span className="ml-2 text-gray-700">
                        {profile.Profile.nid}
                    </span>
                </div>
                <div className="flex flex-col md:flex-row">
                    <div className="mb-2 md:mr-4 text-lg ">
                        KAM Name:
                        <span className="ml-2 text-gray-700">
                            {profile.Profile.kam_name}
                        </span>
                    </div>
                    <div className="text-lg  ml-auto">
                        POC Mobile:
                        <span className="ml-2 text-gray-700">
                            {profile.Profile.poc_mobile}
                        </span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
