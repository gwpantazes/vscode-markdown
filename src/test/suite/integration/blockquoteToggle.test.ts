import { Selection } from 'vscode';
import { resetConfiguration } from "../util/configuration";
import { testCommand } from "../util/generic";

suite("Toggle Block Quote.", () => {
    suiteSetup(async () => {
        await resetConfiguration();
    });

    suiteTeardown(async () => {
        await resetConfiguration();
    });

    test("Add block quote when selected line does not have leading block quote", () => {
        return testCommand('markdown.extension.editing.toggleBlockQuote',
            [
                'Hello',
                'World'
            ],
            new Selection(0, 0, 0, 0),
            [
                '> Hello',
                'World'
            ],
            new Selection(0, 0, 0, 0));
    });

    test("Add block quote when multiple selected lines do not have leading blockquote", () => {
        return testCommand('markdown.extension.editing.toggleBlockQuote',
            [
                'Hello',
                'World'
            ],
            new Selection(0, 3, 1, 2),
            [
                '> Hello',
                '> World'
            ],
            new Selection(0, 0, 0, 0));
    });

    test("Leading blockquote angle brackets may only be indented by 0-3 spaces", () => {
        return testCommand('markdown.extension.editing.toggleBlockQuote',
        [
            'Hello',
            'World'
        ],
        new Selection(0, 3, 1, 2),
        [
            '> Hello',
            '> World'
        ],
        new Selection(0, 0, 0, 0));
    });

    test("Existing angle bracket indented more than 3 spaces (does not count as an existing quote", () => {});

    test("Remove block quote from selected line when  on block quote on current line if there is no leading blockquote (part of line selected)", () => {});

});
