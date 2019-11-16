<template>
    <form class="form" @submit.prevent="onFormSubmit">
        <fieldset class="form-group"
                  v-bind:class="{ 'form-error': !inputValid, 'form-success': input.length}">
            <label for="convert-from-iso">From ISO string:</label>
            <input id="convert-from-iso"
                   class="form-control"
                   type="text"
                   v-model="input">
            <div class="help-block" v-for="error in errors">{{ error }}</div>
            <div class="help-block">Insert an ISO 8601 formatted timestamp<br>
                (may include microsecond decimals).<br><br>
            </div>
        </fieldset>
        <fieldset class="form-group">
            <label for="convert-from-iso-output">Result:</label>
            <input id="convert-from-iso-output"
                   class="form-control"
                   type="text"
                   readonly="readonly"
                   v-model="output">
        </fieldset>
        <input type="submit"
               class="btn btn-primary btn-block"
               value="convert"
        >
    </form>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import * as microtime from '@/lib/microtime';

    @Component
    export default class StringToNumberConverter extends Vue {
        input: string = microtime.toISOString(microtime.now());
        output: number = 0;
        errors: string[] = [];

        onFormSubmit() {
            this.output = 0;
            this.errors = [];
            if (!microtime.isISOString(this.input)) {
                this.errors.push('Input not supported.');
                return;
            }

            this.output = microtime.parseISOString(this.input);
        }

        get inputValid() {
            return microtime.isISOString(this.input);
        }
    }
</script>
