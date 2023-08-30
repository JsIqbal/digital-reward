"use client";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

export const CampaignForm = () => {
    return (
        <>
            <Form>
                <form className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                        placeholder="Store name"
                                        {...field}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button className="ml-auto" type="submit">
                        Save changes
                    </Button>
                </form>
            </Form>
        </>
    );
};
