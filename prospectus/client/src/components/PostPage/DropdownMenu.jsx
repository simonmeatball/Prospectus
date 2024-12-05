import React from "react";

export default function DropdownMenu({
  sortBy,
  setSortBy,
  dropdownShown,
  setDropdownShown,
}) {
  return (
    <div>
      Sort by:
      <div className="dropdown dropdown-bottom">
        <div
          tabIndex={0}
          role="button"
          className="btn m-1"
          onClick={() => setDropdownShown(!dropdownShown)}
        >
          {sortBy}
        </div>
        {dropdownShown && (
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            {[
              "Most recent",
              "Least recent",
            ].map((option) => (
              <li>
                <a
                  onClick={() => {
                    setSortBy(option);
                    setDropdownShown(false);
                  }}
                >
                  {option}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
