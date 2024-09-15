import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Card, CardGroup, CardHeader } from "@trussworks/react-uswds";
import Breadcrumbs from "~/components/Breadcrumbs";
import { mergeMeta } from "~/lib/merge-meta";
import { breadcrumbLinks as indexBreadcrumbs } from "./_index";

export const meta = mergeMeta(({ parentTitle }) => [{ title: `Find a Room • ${parentTitle}` }]);

export const breadcrumbLinks = [...indexBreadcrumbs, { href: "/find-a-room", text: "Find a Room" }];

export function loader({ request }: LoaderFunctionArgs) {
    return new URL(request.url).searchParams.get("org-type") as "business" | "nonprofit";
}

export default function FindARoom() {
    const orgType = useLoaderData<typeof loader>();
    const isBusiness = orgType === "business";

    return (
        <div className="flex justify-center">
            <CardGroup className="min-w-[30rem] max-w-[49rem]">
                <Card>
                    <div className="ml-5 mr-5">
                        <div className="-mt-1 ml-1">
                            <Breadcrumbs links={breadcrumbLinks} />
                        </div>
                        <CardHeader className="-mt-3">
                            <h1 className="font-sans text-sans-2xl usa-card__heading font-bold py-[0.25rem]">
                                Find a Room
                            </h1>
                            {isBusiness && (
                                <h2 className="font-sans text-sans-sm">COMMERCIAL/BUSINESS</h2>
                            )}
                            <p className="font-sans text-base-darker text-sans-xs pt-4">
                                {isBusiness ? (
                                    <>
                                        <strong>
                                            Rooms for commercial work purposes are only available at
                                            capacities of 4, 8, and 10.{" "}
                                        </strong>
                                        Rooms can be booked in 15 min time blocks up to 2-hours, and
                                        up to 2 weeks out.
                                    </>
                                ) : (
                                    <>
                                        For smaller groups, please consider our Shared Learning
                                        Rooms with capacities of 4, 8, and 10. Groups up to 20+ to
                                        100 people are better for Meeting Rooms.
                                    </>
                                )}
                            </p>
                        </CardHeader>
                    </div>
                </Card>
            </CardGroup>
        </div>
    );
}