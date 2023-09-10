import { useState, useEffect } from "react";
import axios from "axios";

async function getCampaignData() {
    try {
        const response = await axios.get(
            "http://localhost:3004/api/users/campaign",
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching campaign data:", error);
        return [
            {
                id: "728ed52f",
                campaign_name: "Dummy 1",
                start_time: "2023-08-01",
                end_time: "2023-08-31",
                masking: "Dummy 1",
                number: "8801234567890",
                operator: "Operator 1",
                status: "Completed",
                reward: "Dummy 1",
                description: "Dummy Description",
            },
        ];
    }
}

const useCampaign = () => {
    const [campaignData, setCampaignData] = useState([]);
    const [campaignStatus, setCampaignStatus] = useState(false);

    const fetchCampaignData = async () => {
        try {
            const data = await getCampaignData();
            setCampaignData(data);
            setCampaignStatus(true);
        } catch (error) {
            console.error("Error fetching campaign data:", error);
            setCampaignData([]);
            setCampaignStatus(false);
        }
    };

    useEffect(() => {
        fetchCampaignData();
    }, []);

    return { campaignData, campaignStatus };
};

export default useCampaign;
