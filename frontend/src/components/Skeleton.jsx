import { Skeleton } from "antd";
import React from "react";
import '../styles/Skeleton.css';

const CardSkeleton = () => {
    return (
        <div className="skeleton--card-listing" id="card-listing">
            <Skeleton.Image
                className="skeleton--card-img property-img"
                active
            />
            <br />
            <br />
            <Skeleton
                active
                variant="rectangular"
                className="skeleton--card-title"
                paragraph={{
                    rows: 1
                }}
                title
            />
            <br />
            <br />
            <div className="skeleton--features">
                <Skeleton
                    active
                    paragraph={false}
                    className="skeleton--card-price"
                />
                <div className="skeleton--feature-items">
                    {
                        Array(3).fill(null).map((_, i) => (
                            <Skeleton.Avatar
                                active
                                paragraph={false}
                                className="skeleton--card-feature"
                                shape="square"
                                key={i}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
const FeaturesSkeleton = () => {
    return (
        <div className="featured-property" id="skeleton--feature-listing">
            <div>
                <Skeleton.Image
                    className="skeleton--feature-img featured-img"
                    active
                />
                <Skeleton
                    paragraph={false}
                    className="skeleton--feature-title"
                />
                <br />
                <Skeleton
                    paragraph={false}
                    className="skeleton--feature-sale_type"
                />
                <br />
                <br />
                <div className="skeleton--feature-items">
                    {
                        Array(3).fill(null).map((_, i) => (
                            <Skeleton.Avatar
                                active
                                paragraph={false}
                                className="skeleton--card-feature"
                                shape="square"
                                key={i}
                            />
                        ))
                    }
                </div>
                <br />
                <br />
                <br />
            </div>
        </div>
    )
}

const PreviewListingSkeleton = () => {
    return (
        <div className="preview--skeleton-container">
            <div className="preview--skeleton-wrapper">
                <div className="preview__photos">
                    <div className="preview__skeleton--left-side">
                        <Skeleton.Image
                            active
                            paragraph={false}
                            className="p__skeleton-left--img"
                            rootClassName="skeleton-left--img"
                        />
                    </div>
                    <div className="preview__skeleton-right-side">
                        <div className="preview__skeleton--right-top">
                            <Skeleton.Image
                                active
                                paragraph={false}
                                className="p__skeleton-right--img"
                                rootClassName="skeleton-right--img"
                            />
                            <Skeleton.Image
                                active
                                paragraph={false}
                                className="p__skeleton-right--img"
                                rootClassName="skeleton-right--img"
                            />
                        </div>
                        <div className="preview__skeleton--right-bottom">
                            <Skeleton.Image
                                active
                                paragraph={false}
                                className="p__skeleton-right--img"
                                rootClassName="skeleton-right--img"
                            />
                            <Skeleton.Image
                                active
                                paragraph={false}
                                className="p__skeleton-right--img"
                                rootClassName="skeleton-right--img"
                            />
                        </div>
                    </div>
                </div>
                <br />
                <div className="preview__details">
                    <div className="preview-details__skeleton--left-side">
                        <Skeleton
                            active
                            paragraph={false}
                            className="skeleton-left__card card-1"
                        />
                        <br />
                        <Skeleton
                            active
                            paragraph={false}
                            className="skeleton-left__card card-2"
                        />
                    </div>
                    <div className="preview-details__skeleton-right-side">
                        <Skeleton
                            active
                            paragraph={false}
                            className="skeleton-right__card"
                        />
                    </div>
                </div>
            </div>
            <br />
            <br />
        </div>
    )
}

const CreateListingSkeleton = () => {
    return (
        <div className="create--skeleton-container">
            <div className="create--skeleton-wrapper">
                <div className="create__cards-top create__cards">
                    <div className="create__skeleton--top-side">
                        <Skeleton
                            active
                            paragraph={false}
                            className="p__skeleton-top--card"
                            rootClassName="skeleton-top--card"
                        />
                    </div>
                </div>
                <br />
                <div className="create__details">
                    {/* <div className="preview-details__skeleton-right-side create__listing-cards">
                        <Skeleton
                            active
                            paragraph={false}
                            className="skeleton-right__card create__listing-card-top"
                        />
                    </div> */}
                    <div className="preview-details__skeleton--left-side create__listing-cards">
                        <Skeleton
                            active
                            paragraph={false}
                            className="skeleton-left__card card-1 create__listing-card-bottom"
                        />
                        <br />
                        <Skeleton
                            active
                            paragraph={false}
                            className="skeleton-left__card card-2 create__listing-card-bottom"
                        />
                    </div>
                </div>
            </div>
            <br />
            <br />
        </div>
    )
}

export {
    CardSkeleton,
    FeaturesSkeleton,
    PreviewListingSkeleton,
    CreateListingSkeleton
}