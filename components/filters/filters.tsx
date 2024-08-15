import AccountFilter from "@/components/filters/account-filter"
import { DateFilter } from "@/components/filters/date-filter"

export const Filters = () => {
    return (
        <div className="flex flex-col lg:flex-row items-center gap-y-2 lg:gap-y-0 lg:gap-x-2">
            <AccountFilter />
            <DateFilter />
        </div>
    )
}