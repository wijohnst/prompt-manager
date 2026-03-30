.PHONY: help build session-start session-end

help:
	@echo "prompt-manager development targets"
	@echo ""
	@echo "  make build              Compile TypeScript to dist/"
	@echo "  make session-start a=<agent>   Start an isolated session for <agent>"
	@echo "  make session-end a=<agent>     End the session for <agent>"
	@echo ""
	@echo "Note: Internal tools only. 'pm build' is the published CLI."

build:
	npm run build

session-start:
	@if [ -z "$(a)" ]; then echo "error: agent required (use: make session-start a=full-stack-engineer)"; exit 1; fi
	./bin/pm-session start $(a)

session-end:
	@if [ -z "$(a)" ]; then echo "error: agent required (use: make session-end a=full-stack-engineer)"; exit 1; fi
	./bin/pm-session end $(a)
