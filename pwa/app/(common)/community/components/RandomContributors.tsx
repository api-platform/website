"use client";
import { useState, useEffect } from "react";
import { Contributor } from "types";
import ContributorItem from "../contributors/components/ContributorItem";
import EmptyContributor from "../contributors/components/EmptyContributor";

export default function RandomContributors({
  contributors,
}: {
  contributors: Contributor[];
}) {
  const [randomContributors, setRandomContributors] = useState<
    Contributor[] | null
  >(null);

  useEffect(() => {
    setRandomContributors(
      contributors.sort(() => 0.5 - Math.random()).slice(0, 3)
    );
  }, [contributors]);

  return (
    <div className="flex flex-row flex-wrap aligh-start justify-center mx-auto w-full max-w-5xl">
      {randomContributors
        ? randomContributors.map((contributor) => (
            <ContributorItem key={contributor.id} contributor={contributor} />
          ))
        : [...Array(3)].map((el, index) => <EmptyContributor key={index} />)}
    </div>
  );
}
