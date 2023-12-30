from django import forms

class CSVFileForm(forms.Form):
    csv_file = forms.FileField()
