import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postService } from "../services";
import { searchDispatch } from "../store/slices/searchSlice";
import { join } from "../utils";
import usePaging from "./usePaging";

function useSearchPost(callbackName) {

    const searchData = useSelector(store => store.searchSlice);
    const dispatch = useDispatch();
    const [ news, setNews ] = useState([]);
    const { setPaging, pages, pageNumber, totalPage, total } = usePaging(null);

    const searchFunc = async () => {
        const result = await postService[callbackName]?.(
        searchData.paging
        , {
            keyWord: searchData.searchText,
            typeOfRealEstate: searchData.houseType,
            provinceId: searchData.address.city,
            districtId: searchData.address.district,
            wardId: searchData.address.ward,
            minPrice: searchData.price.from || null,
            maxPrice: searchData.price.to || null,
            minArea: searchData.areaSize.from || null,
            maxAddress: searchData.areaSize.to || null,
            utility: join(searchData.filterMore.utility, ','),
            bedroom: join(searchData.filterMore.bedroom, ','),
            media: join(searchData.filterMore.media, ','),
            status: searchData.status,
        })
        setNews(result.data.content);
        setPaging(result.data.paging);
    }

    useEffect(() => {
        searchFunc();
    }, [searchData])

    return {
        listPost: news,
        pages,
        totalPage,
        total,
        pageNumber,
        searchFunc,
        reSearch: (newConditions) => {
            dispatch(
                searchDispatch.updateData(newConditions)
            );
        },
        last: function() {
            this.goToPage(totalPage);
        },
        first: function() {
            this.goToPage(1);
        },
        previous: function() {
            this.goToPage(pageNumber - 1);
        },
        next: function() {
            this.goToPage(pageNumber + 1);
        },
        goToPage: function(page) {
            if (page === pageNumber) return;
            this.reSearch({page})
        }
    }
}

export default useSearchPost;