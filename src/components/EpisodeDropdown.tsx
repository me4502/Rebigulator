import { useState, useMemo, useRef, useEffect, type FC } from 'react';
import {
  episodeDropdown,
  dropdownInput,
  dropdownList,
  dropdownItem,
  dropdownItemHighlighted,
  noResults,
} from './EpisodeDropdown.module.css';
import classNames from 'classnames';

// TODO Maybe implement react-query or something so we don't just have this
// weird import in half the files.
const episodes = require('../util/episodes.json') as Array<{
  value: string;
  label: string;
  data: undefined;
}>;

interface EpisodeDropdownProps {
  onSelect: (value: string) => void;
  placeholder?: string;
  value?: string;
  className?: string;
}

export const EpisodeDropdown: FC<EpisodeDropdownProps> = ({
  onSelect,
  placeholder = 'Type to search episodes...',
  value = '',
  className,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Filter episodes based on input value
  const filteredEpisodes = useMemo(() => {
    if (!inputValue.trim()) {
      // TODO maybe randomize this?
      return episodes.slice(0, 10); // Show first 10 if no input
    }

    const searchTerm = inputValue.toLowerCase();
    return episodes
      .filter(
        (episode) =>
          episode.label.toLowerCase().includes(searchTerm) ||
          episode.value.toLowerCase().includes(searchTerm)
      )
      .slice(0, 20); // Limit to 20 results for performance
  }, [inputValue]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  // Handle episode selection
  const handleSelect = (episode: { value: string; label: string }) => {
    setInputValue(episode.label);
    setIsOpen(false);
    setHighlightedIndex(-1);
    onSelect(episode.value);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
        setHighlightedIndex(0);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown': {
        setHighlightedIndex((prev) =>
          prev < filteredEpisodes.length - 1 ? prev + 1 : prev
        );
        e.preventDefault();
        break;
      }
      case 'ArrowUp': {
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        e.preventDefault();
        break;
      }
      case 'Enter': {
        if (
          highlightedIndex >= 0 &&
          highlightedIndex < filteredEpisodes.length
        ) {
          handleSelect(filteredEpisodes[highlightedIndex]);
        }
        e.preventDefault();
        break;
      }
      case 'Escape': {
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
      }
    }
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        listRef.current &&
        !listRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const highlightedElement = listRef.current.children[
        highlightedIndex
      ] as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    }
  }, [highlightedIndex]);

  return (
    <div className={classNames(episodeDropdown, className)}>
      <input
        name={'episode-search'}
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className={dropdownInput}
        autoComplete="off"
      />

      {isOpen && (
        <div ref={listRef} className={dropdownList}>
          {filteredEpisodes.length > 0 ? (
            filteredEpisodes.map((episode, index) => (
              <div
                key={episode.value}
                className={`${dropdownItem} ${
                  index === highlightedIndex ? dropdownItemHighlighted : ''
                }`}
                onClick={() => handleSelect(episode)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                <strong>{episode.value}</strong> - {episode.label}
              </div>
            ))
          ) : (
            <div className={noResults}>
              No episodes found for "{inputValue}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};
